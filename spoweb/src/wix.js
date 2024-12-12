// Add this to the custom code section in Wix

// Backend endpoint to log data
const BACKEND_URL = 'https://spoweb-test-sxv0.onrender.com';

// CAPTCHA data
const captchaData = [
    { img: 'https://static.wixstatic.com/media/31adb6_7c2c2eb1984143ee973c32ba9f6eba8b~mv2.png' },
    { img: 'https://static.wixstatic.com/media/31adb6_fa25281aca264e2f8e0e571ab87d6db3~mv2.png' },
    { img: 'https://static.wixstatic.com/media/31adb6_755b1cb4f93c4045bfaf6942909d7f43~mv2.png' },
    { img: 'https://static.wixstatic.com/media/31adb6_7ecb33ec1b484f5988a1cfafcf24cf78~mv2.png' },
];

const voiceCaptchaData = [
    { answer: "pretty banana" },
    { answer: "brave horse" },
    { answer: "yellow house" },
    { answer: "red sun" },
];

// Utility: Send data to the backend
async function logToBackend(data) {
    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        console.log('Data logged:', data);
        if (!response.ok) {
            throw new Error(`Failed to log data: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error logging to backend:', error);
    }
}

// Feature 1: WebRTC IP Address Logging
async function logWebRTCIPs() {
    try {
        const peerConnection = new RTCPeerConnection();
        peerConnection.createDataChannel('');
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        peerConnection.onicecandidate = (event) => {
            if (event && event.candidate) {
                const candidate = event.candidate.candidate;
                const ipRegex = /(\d{1,3}(\.\d{1,3}){3})/;
                const match = ipRegex.exec(candidate);
                if (match) {
                    const ipAddress = match[1];
                    console.log('WebRTC IP:', ipAddress);
                    logToBackend({ type: 'WebRTC_IP', ip: ipAddress });
                }
            }
        };
    } catch (error) {
        console.error('Error retrieving WebRTC IP:', error);
    }
}

// Feature 2: CAPTCHA Display and Verification
function setupCaptcha() {
    const captchaContainer = document.getElementById('captcha-container');
    const randomCaptcha = captchaData[Math.floor(Math.random() * captchaData.length)];

    captchaContainer.innerHTML = `
    <img src="${randomCaptcha.img}" alt="CAPTCHA" />
    <input type="text" id="captcha-input" placeholder="Enter CAPTCHA" />
    <button id="verify-captcha">Verify</button>
  `;

    document.getElementById('verify-captcha').addEventListener('click', () => {
        const userInput = document.getElementById('captcha-input').value;
        logToBackend({ type: 'CAPTCHA', image: randomCaptcha.img, userInput });
    });
}

// Feature 3: Voice CAPTCHA Integration
function setupVoiceCaptcha() {
    const voiceContainer = document.getElementById('voice-captcha-container');
    const randomVoiceCaptcha = voiceCaptchaData[Math.floor(Math.random() * voiceCaptchaData.length)];

    voiceContainer.innerHTML = `
    <p>Say the following phrase: <strong>${randomVoiceCaptcha.answer}</strong></p>
    <button id="start-voice-captcha">Start Voice CAPTCHA</button>
    <p id="voice-status"></p>
  `;

    document.getElementById('start-voice-captcha').addEventListener('click', () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            document.getElementById('voice-status').innerText = 'Listening...';
        };

        recognition.onresult = (event) => {
            const spokenPhrase = event.results[0][0].transcript;
            const isCorrect = spokenPhrase.toLowerCase() === randomVoiceCaptcha.answer.toLowerCase();
            document.getElementById('voice-status').innerText = isCorrect ? 'Correct!' : 'Try Again.';
            logToBackend({ type: 'Voice_CAPTCHA', correct: isCorrect, spokenPhrase });
        };

        recognition.onerror = (event) => {
            console.error('Speech Recognition Error:', event.error);
            document.getElementById('voice-status').innerText = 'Error: Please try again.';
        };

        recognition.start();
    });
}

// Initialize all features
function init() {
    logWebRTCIPs(); // Log WebRTC IPs on page load
    setupCaptcha(); // Setup image CAPTCHA
    setupVoiceCaptcha(); // Setup voice CAPTCHA
}

// Ensure DOM is loaded before initializing
document.addEventListener('DOMContentLoaded', init);
