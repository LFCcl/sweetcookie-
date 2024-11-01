
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Message, Icon, Modal, Checkbox } from 'semantic-ui-react';
import { Bars, ThreeDots } from 'react-loader-spinner';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import 'semantic-ui-css/semantic.min.css';
import Loading from 'react-loading';
import { FaRobot } from 'react-icons/fa';

const CustomCaptcha = ({
  captchaData,
  voiceCaptchaData,
  onSuccess,
  onFailure,
  isVoiceCaptchaEnabled,
  getWebrtcIp
}) => {
  const [captchaInput, setCaptchaInput] = useState('');
  const [currentCaptcha, setCurrentCaptcha] = useState(null);
  const [isVoiceCaptcha, setIsVoiceCaptcha] = useState(false);
  const [currentVoiceCaptcha, setCurrentVoiceCaptcha] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const transcriptRef = useRef('');
  const [isListening, setIsListening] = useState(false);
  const [isSimpleBoxCaptcha, setIsSimpleBoxCaptcha] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const { transcript, resetTranscript } = useSpeechRecognition();

  // // turn off captcha in development mode
  //   useEffect(() => {
  //     if (process.env.NODE_ENV === 'development') {
  //       // Automatically succeed CAPTCHA in local development mode
  //       console.log('Development mode detected, CAPTCHA bypassed');
  //       onSuccess();
  //       return;
  //     }

  useEffect(() => {
    loadRandomCaptcha();
  }, []);

  useEffect(() => {
    if (isVoiceCaptchaEnabled) {
      loadRandomVoiceCaptcha();
    }
  }, [isVoiceCaptchaEnabled]);

  useEffect(() => {
    transcriptRef.current = transcript;
  }, [transcript]);

  const loadRandomCaptcha = () => {
    const randomIndex = Math.floor(Math.random() * captchaData.length);
    setCurrentCaptcha(captchaData[randomIndex]);
  };

  const loadRandomVoiceCaptcha = () => {
    const randomIndex = Math.floor(Math.random() * voiceCaptchaData.length);
    setCurrentVoiceCaptcha(voiceCaptchaData[randomIndex]);
  };

  const handleCaptchaInputChange = (e) => {
    setCaptchaInput(e.target.value);
  };

  const handleCaptchaSubmit = () => {
    // Always treat it as a failure and proceed to voice CAPTCHA
    onFailure();
    setCaptchaInput(''); // Clear the input

    // Automatically move to voice CAPTCHA
    if (isVoiceCaptchaEnabled) {
      setIsVoiceCaptcha(true);
      loadRandomVoiceCaptcha(); // Load the voice CAPTCHA
    } else {
      loadRandomCaptcha(); // If voice CAPTCHA is not enabled, reload another text CAPTCHA
    }
  };

  const startListeningFox = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);

      // Implement processing or streaming of audio data
    } catch (err) {
      console.error('Error accessing audio:', err);
    }
  };

  const handleVoiceCaptchaStart = async () => {
    setIsListening(true);
    resetTranscript();
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      await startListeningFox();
    } else {
      SpeechRecognition.startListening();
    }

    setTimeout(() => {
      handleVoiceCaptchaSubmit();
    }, 3000);

    getWebrtcIp();
  };

  const handleVoiceCaptchaSubmit = () => {
    setIsListening(false);
    setIsProcessing(true);
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      setTimeout(() => {
        setIsProcessing(false);
        window.alert('Captcha failed: Speech recognition not supported');
        setIsSimpleBoxCaptcha(true); // Show simple box captcha
      }, 1500);
    } else {
      setTimeout(() => {
        const transcriptText = transcriptRef.current.toLowerCase();
        if (transcriptText.includes(currentVoiceCaptcha.answer.toLowerCase())) {
          onSuccess();
          SpeechRecognition.stopListening();
        } else {
          onFailure();
          resetTranscript();
          SpeechRecognition.stopListening();
          loadRandomVoiceCaptcha();
        }
        setIsProcessing(false);
      }, 1500);
    }
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleSimpleBoxCaptchaClick = () => {
    setIsChecked(true);
    setTimeout(() => {
      onSuccess();
    }, 1500);
  };

  // Correctly return the JSX from the component function
  return (
    <div className="captcha-container" style={{ width: '50vw', border: '0px solid red', maxWidth: '400px' }}>
      {!isVoiceCaptcha && !isSimpleBoxCaptcha ? (
        <>
          {currentCaptcha && (
            <div>
              <Message>
                <Message.Header>
                  To continue, type the characters you see in the picture. <a href="#!" onClick={openModal} style={{ color: 'blue' }}>Why?</a>
                </Message.Header>
                <img src={currentCaptcha.img} alt="CAPTCHA" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
              </Message>
              <Input
                fluid
                value={captchaInput}
                onChange={handleCaptchaInputChange}
                placeholder="Enter the text you see"
                style={{ marginTop: '10px' }}
              />
              <Button primary onClick={handleCaptchaSubmit} style={{ marginTop: '10px' }}>
                Submit
              </Button>
            </div>
          )}
        </>
      ) : isVoiceCaptcha && !isSimpleBoxCaptcha ? (
        <>
          <Message icon>
            <Icon name="microphone" />
            <Message.Content>
              <Message.Header>
                To continue, please say the following phrase. <a href="#!" onClick={openModal} style={{ color: 'blue' }}>Why?</a>
              </Message.Header>
              <div style={{ height: '5px' }} />
              <p><strong>{currentVoiceCaptcha?.answer}</strong></p>
            </Message.Content>
          </Message>

          <div style={{ width: '100%', border: '0px solid red', display: 'flex', flexDirection: 'row' }}>
            <Button style={{ width: '220px' }} primary onClick={handleVoiceCaptchaStart} disabled={isListening} icon labelPosition="left">
              <Icon name={isListening ? 'spinner' : 'play'} loading={isListening} />
              {isListening ? 'Listening...' : 'Start Voice CAPTCHA'}
            </Button>
            <div style={{ width: '180px' }}>
              {isListening && !isProcessing && (
                <div style={{ border: '0px solid red', height: '35px', display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
                  <Bars height="25" width="50" color="blue" ariaLabel="audio-loading" />
                  <p><strong>Processing...</strong></p>
                </div>
              )}
              {isProcessing && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', border: '0px solid red' }}>
                  <ThreeDots height="35" width="50" color="blue" ariaLabel="audio-processing" />
                  <p><strong>Authenticating...</strong></p>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <strong>Please check the box below to proceed. <a href="#!" onClick={openModal} style={{ color: 'blue' }}>Why?</a></strong>
          <Message>
            <Message.Header>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '0px solid red', margin: '10px', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '0px solid red', justifyContent: 'flex-start', gap: '20px', alignItems: 'center' }}>
                  {isChecked ? (
                    <Loading type="spin" color="blue" height={20} width={20} />
                  ) : (
                    <Checkbox
                      onClick={handleSimpleBoxCaptchaClick}
                      style={{ transform: 'scale(1.5)' }}
                    />
                  )}

                  I'm not a robot
                </div>
                <img src={'captchalogo.png'} alt="CAPTCHA" style={{ height: '40px', objectFit: 'contain' }} />
              </div>
            </Message.Header>
          </Message>
        </div>
      )}

      <Modal open={modalOpen} onClose={closeModal}>
        <Modal.Header>Why am I seeing this CAPTCHA?</Modal.Header>
        <Modal.Content>
          <p>
            We're showing you this CAPTCHA to make sure you're not a bot. CAPTCHAs help prevent automated systems from misusing our services. Please complete the CAPTCHA to continue using the site.
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={closeModal}>Got it</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

CustomCaptcha.propTypes = {
  captchaData: PropTypes.array.isRequired,
  voiceCaptchaData: PropTypes.array.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  isVoiceCaptchaEnabled: PropTypes.bool.isRequired,
  getWebrtcIp: PropTypes.func.isRequired,
};

export default CustomCaptcha;
