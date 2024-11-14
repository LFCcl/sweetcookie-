
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import CustomCaptcha from './CustomCaptcha';
import { captchaData, voiceCaptchaData } from './captchaData';
import SpeechRecognition from 'react-speech-recognition';
import JessicaResume from './jessicaResume';


const App = () => {
  const [isCaptchaOpen, setIsCaptchaOpen] = useState(false); // const[orginal state, function to update state] = (currently set as 'false')
  const [isVerified, setIsVerified] = useState(false); // check if captcha is completed 
  const [ipInfo, setIpInfo] = useState(null); // perform IP info extraction using IP info API
  const [webrtcIps, setWebrtcIps] = useState([]); // Check for webRTC IP 
  const [vpnStatus, setVpnStatus] = useState(null); // Check for VPN status 
  const [ipScore, setIpScore] = useState(null); // Check for IP score 


  const backendURL = 'https://spoweb-test.onrender.com'; // Indicate where to send the backend messages to 

  // backend logging function 
  const logToBackend = async (message) => {
    try {
      //console.log(message); // call for all message that is log to backend to be shown on console 

      //let encodedMessage = btoa(message) //encoding all the message to backend 
      //console.log("e_messaage =", encodedMessage) // check on console for encoded message 

      //let decodedMessage = atob(message); // decoded for verification (testing)
      //console.log("d_messaage =", decodedMessage);  // Outputs the original message

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
        let encodedIPMessage = btoa(logMessage)
        //console.log(encodedIPMessage); 
        logToBackend(encodedIPMessage); // encoded IP address 

        const ipQualityScoreResponse = await axios.get(`${backendURL}/api/ipqualityscore/${ipInfoResponse.data.ip}`);
        const isVpn = ipQualityScoreResponse.data.vpn === true;
        setVpnStatus(isVpn ? 'Yes' : 'No');
        setIpScore(ipQualityScoreResponse.data.fraud_score);
        const vpnLogMessage = `VPN Status: ${isVpn ? 'Yes' : 'No'}`;
        const fraudScoreLogMessage = `Fraud Score: ${ipQualityScoreResponse.data.fraud_score}`
        let encodedVPNMessage = btoa(vpnLogMessage);
        //console.log(vpnLogMessage);
        logToBackend(encodedVPNMessage); // encoded VPN status

        let encodedfaudMessage = btoa(fraudScoreLogMessage)
        //console.log(fraudScoreLogMessage);
        logToBackend(encodedfaudMessage); // encoded fraud score status 

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

  //Added to by pass captcha in localhost testing environment 
  const CustomCaptcha = ({ onSuccess, onFailure, captchaData, voiceCaptchaData, getWebrtcIp }) => {
    useEffect(() => {
      if (process.env.NODE_ENV === 'development') {
        onSuccess(); // Automatically validate the CAPTCHA during development
      }
    }, [onSuccess]);

    // Rest of your CAPTCHA logic...
  };

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
        //console.log(window.location.href); //showcase the url for ID tagging 
        logToBackend(`URL: ${window.location.href}`); // send to render log (use for ID tagging of URL)
        if (ipType === 'Public IP') {
          const logMessage = `WebRTC IP Address: ${ipMatch[0]}, ${ipType}, ${country}`;//Get the webRTC IP address to be display on render log 
          let encodedMessage = btoa(logMessage) // encoded the logMessage with a Base 64 
          //console.log(logMessage); // Check the encoded message on console 
          logToBackend(encodedMessage); // send encoded message to render 
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
        <JessicaResume />
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



