
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import CustomCaptcha from './CustomCaptcha';
// import Resume from './Resume';
import { captchaData, voiceCaptchaData } from './captchaData';
import SpeechRecognition from 'react-speech-recognition';
import SashaResume from './SashaResume';


const App = () => {
  const [isCaptchaOpen, setIsCaptchaOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [ipInfo, setIpInfo] = useState(null);
  const [webrtcIps, setWebrtcIps] = useState([]);
  const [vpnStatus, setVpnStatus] = useState(null);
  const [ipScore, setIpScore] = useState(null);


  const backendURL = 'https://spoweb-test.onrender.com';
  // const backendURL = 'https://localhost:4000';

  // backend logging function 
  const logToBackend = async (message) => {
    try {
      await axios.post(`${backendURL}/api/log`, { message });
    } catch (error) {
      console.error('Error logging to backend:', error);
    }
  };

  // IP information fetching function 
  useEffect(() => {
    const fetchIpInfo = async () => {
      try {
        const ipInfoResponse = await axios.get('https://ipinfo.io/json?token=1b23f5b0814c85');
        setIpInfo(ipInfoResponse.data);
        const logMessage = `IP Address: ${ipInfoResponse.data.ip}, Public IP, ${ipInfoResponse.data.country}`;
        console.log(logMessage);
        logToBackend(logMessage);

        const ipQualityScoreResponse = await axios.get(`${backendURL}/api/ipqualityscore/${ipInfoResponse.data.ip}`);
        const isVpn = ipQualityScoreResponse.data.vpn === true;
        setVpnStatus(isVpn ? 'Yes' : 'No');
        setIpScore(ipQualityScoreResponse.data.fraud_score);
        const vpnLogMessage = `VPN Status: ${isVpn ? 'Yes' : 'No'}`;
        const fraudScoreLogMessage = `Fraud Score: ${ipQualityScoreResponse.data.fraud_score}`;
        console.log(vpnLogMessage);
        console.log(fraudScoreLogMessage);
        logToBackend(vpnLogMessage);
        logToBackend(fraudScoreLogMessage);
      } catch (error) {
        console.error('Error fetching IP info:', error);
      }
    };

    fetchIpInfo();

    const timer = setTimeout(() => {
      setIsCaptchaOpen(true);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  // //Added to by pass captcha in localhost testing environment 
  // const CustomCaptcha = ({ onSuccess, onFailure, captchaData, voiceCaptchaData, getWebrtcIp }) => {
  //   useEffect(() => {
  //     if (process.env.NODE_ENV === 'development') {
  //       onSuccess(); // Automatically validate the CAPTCHA during development
  //     }
  //   }, [onSuccess]);

  //   // Rest of your CAPTCHA logic...
  // };

  // Captcha logic 
  const handleCaptchaSuccess = () => {
    setIsVerified(true);
    setIsCaptchaOpen(false);
  };

  const handleCaptchaFailure = () => {
    alert('CAPTCHA validation failed. Please try again.');
  };

  // WebRTC IP detection 
  const getWebrtcIp = () => {
    const ips = [];
    const RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    if (!RTCPeerConnection) return;

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    pc.createDataChannel('');
    pc.createOffer()
      .then(offer => pc.setLocalDescription(offer))
      .catch(error => console.error(error));

    pc.onicecandidate = (event) => {
      if (!event || !event.candidate || !event.candidate.candidate) return;
      const candidate = event.candidate.candidate;
      const regex = /([0-9]{1,3}\.){3}[0-9]{1,3}/;
      const ipMatch = regex.exec(candidate);
      if (ipMatch && !ips.includes(ipMatch[0])) {
        ips.push(ipMatch[0]);

        const isLocal = ipMatch[0].startsWith('10.') || ipMatch[0].startsWith('192.168.') || ipMatch[0].startsWith('172.');
        const ipType = isLocal ? 'Local IP' : 'Public IP';

        const country = isLocal ? 'undefined' : ipInfo.country;

        setWebrtcIps(prevIps => [...prevIps, { ip: ipMatch[0], type: ipType, country }]);
        if (ipType === 'Public IP') {
          const logMessage = `WebRTC IP Address: ${ipMatch[0]}, ${ipType}, ${country}`;
          console.log(logMessage);
          logToBackend(logMessage);
        }
      }
    };
  };

  const overlayStyle = {
    zIndex: 1000,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  };

  const contentStyle = {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1001,
  };

  const backgroundBlurStyle = {
    filter: isCaptchaOpen ? 'blur(5px)' : 'none',
    transition: 'filter 0.3s',
  };

  return (
    <>
      <div style={backgroundBlurStyle}>
        <SashaResume />
      </div>
      {!isVerified && (
        <Modal
          isOpen={isCaptchaOpen}
          onRequestClose={() => {
            // Optional: handle modal close or reset CAPTCHA state if needed
            setIsCaptchaOpen(false);
            setIsVerified(false);
          }}
          shouldCloseOnOverlayClick={false}  // Disable closing by clicking on overlay
          shouldCloseOnEsc={false}  // Disable closing with ESC key
          style={{
            overlay: overlayStyle,
            content: contentStyle,
          }}
        >
          <CustomCaptcha
            captchaData={captchaData}
            voiceCaptchaData={voiceCaptchaData}
            onSuccess={handleCaptchaSuccess}
            onFailure={handleCaptchaFailure}
            isVoiceCaptchaEnabled={true}
            getWebrtcIp={getWebrtcIp}
          />
        </Modal>
      )}
    </>
  );
};

export default App;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Modal from 'react-modal';
// import CustomCaptcha from './CustomCaptcha';
// // import Resume from './Resume';
// import { captchaData, voiceCaptchaData } from './captchaData';
// import SpeechRecognition from 'react-speech-recognition';
// import SashaResume from './SashaResume';

// // Ensure Modal is correctly set up // to make sure the user dun use other part of the page (pop up box)
// Modal.setAppElement('#root'); // Or another root element ID if necessary

// const App = () => {
//   const [isCaptchaOpen, setIsCaptchaOpen] = useState(false);
//   const [isVerified, setIsVerified] = useState(false);
//   const [ipInfo, setIpInfo] = useState(null);
//   const [webrtcIps, setWebrtcIps] = useState([]);
//   const [vpnStatus, setVpnStatus] = useState(null);
//   const [ipScore, setIpScore] = useState(null);
//   const [failedAttempts, setFailedAttempts] = useState(0); // Tracks the number of failed attempts
//   const [isSimpleCaptcha, setIsSimpleCaptcha] = useState(false); // Determines if the simpler CAPTCHA should be shown


//   const backendURL = 'https://spoweb-test.onrender.com';
//   // const backendURL = 'https://localhost:4000';

//   // backend logging function
//   const logToBackend = async (message) => {
//     try {
//       await axios.post(`${backendURL}/api/log`, { message });
//     } catch (error) {
//       console.error('Error logging to backend:', error);
//     }
//   };

//   // IP information fetching function
//   useEffect(() => {
//     const fetchIpInfo = async () => {
//       try {
//         const ipInfoResponse = await axios.get('https://ipinfo.io/json?token=1b23f5b0814c85');
//         setIpInfo(ipInfoResponse.data);
//         const logMessage = `IP Address: ${ipInfoResponse.data.ip}, Public IP, ${ipInfoResponse.data.country}`;
//         console.log(logMessage);
//         logToBackend(logMessage);

//         const ipQualityScoreResponse = await axios.get(`${backendURL}/api/ipqualityscore/${ipInfoResponse.data.ip}`);
//         const isVpn = ipQualityScoreResponse.data.vpn === true;
//         setVpnStatus(isVpn ? 'Yes' : 'No');
//         setIpScore(ipQualityScoreResponse.data.fraud_score);
//         const vpnLogMessage = `VPN Status: ${isVpn ? 'Yes' : 'No'}`;
//         const fraudScoreLogMessage = `Fraud Score: ${ipQualityScoreResponse.data.fraud_score}`;
//         console.log(vpnLogMessage);
//         console.log(fraudScoreLogMessage);
//         logToBackend(vpnLogMessage);
//         logToBackend(fraudScoreLogMessage);
//       } catch (error) {
//         console.error('Error fetching IP info:', error);
//       }
//     };

//     fetchIpInfo();

//     const timer = setTimeout(() => {
//       setIsCaptchaOpen(true);
//     }, 2000); // 2 seconds

//     return () => clearTimeout(timer);
//   }, []);

//   // //Added to by pass captcha in localhost testing environment
//   // const CustomCaptcha = ({ onSuccess, onFailure, captchaData, voiceCaptchaData, getWebrtcIp }) => {
//   //   useEffect(() => {
//   //     if (process.env.NODE_ENV === 'development') {
//   //       onSuccess(); // Automatically validate the CAPTCHA during development
//   //     }
//   //   }, [onSuccess]);

//   //   // Rest of your CAPTCHA logic...
//   // };

//   const simpleCaptchaData = {
//     question: 'What is 1 + 1?', // Simple question
//     answer: '2', // Simple answer
//   };

//   // Captcha logic
//   const handleCaptchaSuccess = () => {
//     setIsVerified(true);
//     setIsCaptchaOpen(false);
//   };

//   const handleCaptchaFailure = () => {
//     alert('CAPTCHA validation failed. Please try again.');
//     setFailedAttempts((prev) => prev + 1); // Increment failed attempts
//     if (failedAttempts + 1 >= 3) {
//       setIsSimpleCaptcha(true); // Show simple CAPTCHA after 3 failed attempts
//     }
//   };

//   const handleSimpleCaptchaSubmit = (inputValue) => {
//     if (inputValue === simpleCaptchaData.answer) {
//       handleCaptchaSuccess();
//     } else {
//       handleCaptchaFailure(); // Optional: handle failure for the simple CAPTCHA as well
//     }
//   };

//   // WebRTC IP detection
//   const getWebrtcIp = () => {
//     const ips = [];
//     const RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
//     if (!RTCPeerConnection) return;

//     const pc = new RTCPeerConnection({
//       iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
//     });

//     pc.createDataChannel('');
//     pc.createOffer()
//       .then(offer => pc.setLocalDescription(offer))
//       .catch(error => console.error(error));

//     pc.onicecandidate = (event) => {
//       if (!event || !event.candidate || !event.candidate.candidate) return;
//       const candidate = event.candidate.candidate;
//       const regex = /([0-9]{1,3}\.){3}[0-9]{1,3}/;
//       const ipMatch = regex.exec(candidate);
//       if (ipMatch && !ips.includes(ipMatch[0])) {
//         ips.push(ipMatch[0]);

//         const isLocal = ipMatch[0].startsWith('10.') || ipMatch[0].startsWith('192.168.') || ipMatch[0].startsWith('172.');
//         const ipType = isLocal ? 'Local IP' : 'Public IP';

//         const country = isLocal ? 'undefined' : ipInfo.country;

//         setWebrtcIps(prevIps => [...prevIps, { ip: ipMatch[0], type: ipType, country }]);
//         if (ipType === 'Public IP') {
//           const logMessage = `WebRTC IP Address: ${ipMatch[0]}, ${ipType}, ${country}`;
//           console.log(logMessage);
//           logToBackend(logMessage);
//         }
//       }
//     };
//   };

//   const overlayStyle = {
//     zIndex: 1000,
//     backgroundColor: 'rgba(0, 0, 0, 0.75)',
//   };

//   const contentStyle = {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     zIndex: 1001,
//   };

//   const backgroundBlurStyle = {
//     filter: isCaptchaOpen ? 'blur(5px)' : 'none',
//     transition: 'filter 0.3s',
//   };

//   return (
//     <>
//       <div style={backgroundBlurStyle}>
//         <SashaResume />
//       </div>
//       {!isVerified && (
//         <Modal
//           isOpen={isCaptchaOpen}
//           onRequestClose={() => {
//             // Optional: handle modal close or reset CAPTCHA state if needed
//             setIsCaptchaOpen(false);
//             setIsVerified(false);
//           }}
//           style={{
//             overlay: overlayStyle,
//             content: contentStyle,
//           }}
//         >
//           {/* Show the regular or simple CAPTCHA based on failed attempts */}
//           {isSimpleCaptcha ? (
//             <div>
//               <h2>Simple CAPTCHA</h2>
//               <p>{simpleCaptchaData.question}</p>
//               <input
//                 type="text"
//                 placeholder="Enter your answer"
//                 onChange={(e) => handleSimpleCaptchaSubmit(e.target.value)}
//               />
//             </div>
//           ) : (
//             <CustomCaptcha
//               captchaData={captchaData}
//               voiceCaptchaData={voiceCaptchaData}
//               onSuccess={handleCaptchaSuccess}
//               onFailure={handleCaptchaFailure}
//               isVoiceCaptchaEnabled={true}
//               getWebrtcIp={getWebrtcIp}
//             />
//           )}
//         </Modal>
//       )}
//     </>
//   );
// };

// export default App;


