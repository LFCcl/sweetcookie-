// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const App = () => {
//   const [initialIp, setInitialIp] = useState('');
//   const [ipInfo, setIpInfo] = useState({});
//   const [vpnStatus, setVpnStatus] = useState('Unknown');
//   const [downloadIp, setDownloadIp] = useState('');

//   useEffect(() => {
//     // Fetch initial IP info using ipinfo.io
//     const fetchIpInfo = async () => {
//       try {
//         const response = await axios.get('https://ipinfo.io/json?token=6652c2d99073cb');
//         setIpInfo(response.data);
//         setInitialIp(response.data.ip);
//         setVpnStatus(response.data.privacy && response.data.privacy.vpn ? 'Yes' : 'No');
//       } catch (error) {
//         console.error('Error fetching IP info:', error);
//       }
//     };

//     fetchIpInfo();
//   }, []);

//   const handleDownload = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch('/download');
//       if (response.ok) {
//         const blob = await response.blob();
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'file.zip'; // Name of the file to be downloaded
//         document.body.appendChild(a);
//         a.click();
//         a.remove();
//         console.log('File download initiated');

//         // Fetch the download IP address from the server
//         const fetchDownloadIp = async () => {
//           try {
//             const response = await fetch('/download-ip');
//             if (response.ok) {
//               const data = await response.json();
//               setDownloadIp(data.ip);
//             } else {
//               console.error('Error fetching download IP:', response.statusText);
//             }
//           } catch (error) {
//             console.error('Error fetching download IP:', error);
//           }
//         };

//         fetchDownloadIp();
//       } else {
//         console.error('Error downloading file:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error downloading file:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Download File</h1>
//       <a href="/download" onClick={handleDownload}>Download</a>
//       <h2>IP Addresses</h2>
//       <p><strong>Initial IP Address:</strong> {initialIp}</p>
//       <p><strong>VPN Status:</strong> {vpnStatus}</p>
//       <p><strong>IP Address from File Download:</strong> {downloadIp}</p>
//       {ipInfo && (
//         <div>

//         </div>
//       )}
//     </div>
//   );
// };
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

  const logToBackend = async (message) => {
    try {
      await axios.post(`${backendURL}/api/log`, { message });
    } catch (error) {
      console.error('Error logging to backend:', error);
    }
  };

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

  const handleCaptchaSuccess = () => {
    setIsVerified(true);
    setIsCaptchaOpen(false);
  };

  const handleCaptchaFailure = () => {
    alert('CAPTCHA validation failed. Please try again.');
  };

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
          onRequestClose={() => { }}
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







// // const response = await axios.get('https://ipinfo.io/json?token=6652c2d99073cb');




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function App() {
//   const [ipInfo, setIpInfo] = useState(null);
//   const [vpnStatus, setVpnStatus] = useState(null);
//   const [webrtcIp, setWebrtcIp] = useState(null);
//   const [ipScore, setIpScore] = useState(null);

//   useEffect(() => {
//     // Fetch IP info using ipinfo.io and IPQualityScore
//     const fetchIpInfo = async () => {
//       try {
//         const ipInfoResponse = await axios.get('https://ipinfo.io/json?token=6652c2d99073cb');
//         setIpInfo(ipInfoResponse.data);

//         const ipQualityScoreResponse = await axios.get(`http://localhost:4000/api/ipqualityscore/${ipInfoResponse.data.ip}`);
//         const isVpn = ipQualityScoreResponse.data.vpn === true;
//         setVpnStatus(isVpn ? 'Yes' : 'No');
//         setIpScore(ipQualityScoreResponse.data.fraud_score); // Update the state with the IP score
//       } catch (error) {
//         console.error('Error fetching IP info:', error);
//       }
//     };

//     fetchIpInfo();
//   }, []);

//   // Prompt for microphone access and get WebRTC IP address
//   const enableMicrophone = async () => {
//     try {
//       await navigator.mediaDevices.getUserMedia({ audio: true });
//       getWebrtcIp();
//     } catch (error) {
//       console.error('Microphone access denied:', error);
//     }
//   };

//   // Function to get WebRTC IP address
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
//         setWebrtcIp(ipMatch[0]);
//       }
//     };
//   };

//   return (
//     <div className="App">
//       <h1>IP and VPN Detection</h1>
//       {ipInfo && (
//         <div>
//           <p><strong>IP Address:</strong> {ipInfo.ip}</p>
//           <p><strong>Location:</strong> {ipInfo.city}, {ipInfo.region}, {ipInfo.country}</p>
//           <p><strong>VPN:</strong> {vpnStatus}</p>
//           {ipScore !== null && (
//             <p><strong>IP Score:</strong> {ipScore}</p>
//           )}
//         </div>
//       )}
//       <button onClick={enableMicrophone}>Enable Microphone and Detect WebRTC IP</button>
//       {webrtcIp && (
//         <p><strong>WebRTC IP Address:</strong> {webrtcIp}</p>
//       )}
//     </div>
//   );
// }

// export default App;
