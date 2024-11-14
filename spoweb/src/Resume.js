import React from 'react';
import { FaBriefcase, FaHome, FaEnvelope, FaPhone, FaAsterisk, FaGlobe, FaSuitcase, FaCertificate, FaCalendar, FaFacebook, FaInstagram, FaSnapchat, FaPinterest, FaTwitter, FaLinkedin } from 'react-icons/fa';
import boyImage from './boy.png';

function Resume() {
    return (
        <div className="App">
            <style>{`
                html, body, h1, h2, h3, h4, h5, h6 { font-family: "Roboto", sans-serif; }
                .w3-light-grey { background-color: #f1f1f1; }
                .w3-content { max-width: 1400px; margin: auto; }
                .w3-margin-top { margin-top: 16px; }
                .w3-row-padding { padding: 0 8px; }
                .w3-third { width: 33%; float: left; padding: 0 8px; }
                .w3-twothird { width: 66%; float: left; padding: 0 8px; }
                .w3-white { background-color: #fff; }
                .w3-text-grey { color: #757575 !important; }
                .w3-text-teal { color: #009688 !important; }
                .w3-container { padding: 0.01em 16px; }
                .w3-card-4, .w3-card { box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12); }
                .w3-round-xlarge { border-radius: 16px; }
                .w3-round { border-radius: 8px; }
                .w3-margin-right { margin-right: 16px; }
                .w3-margin-bottom { margin-bottom: 16px; }
                .w3-padding-16 { padding-top: 16px !important; padding-bottom: 16px !important; }
                .w3-text-theme { color: #009688 !important; }
                .w3-hover-opacity:hover { opacity: 0.6; }
                .w3-center { text-align: center !important; }
                .progress-container { background-color: #f1f1f1; border-radius: 8px; height: 24px; margin: 4px 0; overflow: hidden; }
                .progress-bar { height: 100%; line-height: 24px; color: white; text-align: center; white-space: nowrap; }
            `}</style>

            <div className="w3-light-grey">
                <div className="w3-content w3-margin-top" style={{ maxWidth: '1400px', border: '0px solid red' }}>
                    <div className="w3-row-padding" style={{ border: '0px solid green', display: 'flex', flexDirection: 'row' }}>
                        <div className="w3-third">
                            <div className="w3-white w3-text-grey w3-card-4">
                                <div className="w3-display-container">
                                    <img src={boyImage} alt="Avatar" style={{ width: '100%' }} />
                                    <div className="w3-display-bottomleft w3-container w3-text-black">
                                        <h2>Lim Wen Jun</h2>
                                    </div>
                                </div>
                                <div className="w3-container">
                                    <p><FaBriefcase className="w3-margin-right w3-large w3-text-teal" />Student</p>
                                    <p><FaHome className="w3-margin-right w3-large w3-text-teal" />Singapore</p>
                                    <p><FaEnvelope className="w3-margin-right w3-large w3-text-teal" />[Email]</p>
                                    <p><FaPhone className="w3-margin-right w3-large w3-text-teal" />[Phone]</p>
                                    <hr />
                                    <p className="w3-large"><b><FaAsterisk className="w3-margin-right w3-text-teal" />Skills</b></p>
                                    <p>Teamwork</p>
                                    <div className="progress-container">
                                        <div className="progress-bar" style={{ width: '90%', backgroundColor: '#009688' }}>90%</div>
                                    </div>
                                    <p>Photoshop</p>
                                    <div className="progress-container">
                                        <div className="progress-bar" style={{ width: '80%', backgroundColor: '#009688' }}>80%</div>
                                    </div>
                                    <p>Problem Solving</p>
                                    <div className="progress-container">
                                        <div className="progress-bar" style={{ width: '75%', backgroundColor: '#009688' }}>75%</div>
                                    </div>
                                    <p>Flexibility</p>
                                    <div className="progress-container">
                                        <div className="progress-bar" style={{ width: '50%', backgroundColor: '#009688' }}>50%</div>
                                    </div>
                                    <br />
                                    <p className="w3-large w3-text-theme"><b><FaGlobe className="w3-margin-right w3-text-teal" />Languages</b></p>
                                    <p>English</p>
                                    <div className="progress-container">
                                        <div className="progress-bar" style={{ width: '100%', backgroundColor: '#009688' }}></div>
                                    </div>
                                    <p>Chinese</p>
                                    <div className="progress-container">
                                        <div className="progress-bar" style={{ width: '55%', backgroundColor: '#009688' }}></div>
                                    </div>
                                    <br />
                                </div>
                            </div>
                            <br />
                        </div>
                        <div className="w3-twothird">

                            <div className="w3-container w3-card w3-white w3-margin-bottom">
                                <h2 className="w3-text-grey w3-padding-16"><FaSuitcase className="w3-margin-right w3-xxlarge w3-text-teal" />Work Experience</h2>
                                <div className="w3-container">
                                    <h5 className="w3-opacity"><b>F&B Waiter / Wibly Lu</b></h5>
                                    <h6 className="w3-text-teal"><FaCalendar className="w3-margin-right" />Jun 2023 - Aug 2023</h6>
                                    <p>Provided excellent customer service in a fast-paced environment, effectively managing orders and ensuring customer satisfaction. Handled cash and card transactions, maintained cleanliness and organization of the work area, and collaborated with team members to improve service efficiency.</p>
                                    <hr />
                                </div>
                                <div className="w3-container">
                                    <h5 className="w3-opacity"><b>Sales Associate / Giordano</b></h5>
                                    <h6 className="w3-text-teal"><FaCalendar className="w3-margin-right" />Dec 2022 - May 2023</h6>
                                    <p>Engaged with customers to understand their needs and provide personalized product recommendations. Managed inventory, processed sales transactions, and handled customer inquiries and complaints effectively. Worked with team members to achieve sales targets and maintain a positive store environment.</p>
                                    <hr />
                                </div>
                                <div className="w3-container">
                                    <h5 className="w3-opacity"><b>Food Drive Volunteer / Hong Kah North CC</b></h5>
                                    <h6 className="w3-text-teal"><FaCalendar className="w3-margin-right" />Jul 2022 - Nov 2022</h6>
                                    <p>Assisted in organizing and distributing food to beneficiaries, coordinated with other volunteers to streamline operations, and contributed to outreach efforts to increase community involvement. Ensured the accurate handling and distribution of food items while maintaining a respectful and supportive environment.</p>
                                    <br />
                                </div>
                            </div>

                            <div className="w3-container w3-card w3-white">
                                <h2 className="w3-text-grey w3-padding-16"><FaCertificate className="w3-margin-right w3-xxlarge w3-text-teal" />Education</h2>
                                <div className="w3-container">
                                    <h5 className="w3-opacity"><b>Bartley Secondary School</b></h5>
                                    <h6 className="w3-text-teal"><FaCalendar className="w3-margin-right" />Jan 2018 - Dec 2022</h6>
                                    <p>Completed secondary education with a focus on foundational skills and knowledge. Participated in various school activities and developed strong organizational and teamwork abilities.</p>
                                    <hr />
                                </div>
                                <div className="w3-container">
                                    <h5 className="w3-opacity"><b>Singapore Polytechnic (Arts Business Management)</b></h5>
                                    <h6 className="w3-text-teal"><FaCalendar className="w3-margin-right" />Jan 2023 - Present</h6>
                                    <p>Diploma in Arts Business Management, focusing on business principles, management strategies, and creative industries. Gained practical experience through projects and internships, enhancing skills in business analysis, communication, and leadership.</p>
                                    <hr />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <footer className="w3-container w3-teal w3-center w3-margin-top">
                    <p>Find me on social media.</p>
                    <FaFacebook className="w3-hover-opacity" />
                    <FaInstagram className="w3-hover-opacity" />
                    <FaSnapchat className="w3-hover-opacity" />
                    <FaPinterest className="w3-hover-opacity" />
                    <FaTwitter className="w3-hover-opacity" />
                    <FaLinkedin className="w3-hover-opacity" />
                </footer>
            </div>
        </div>
    );
}

export default Resume;
