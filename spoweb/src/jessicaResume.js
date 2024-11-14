import React from 'react';
import { FaBriefcase, FaHome, FaEnvelope, FaPhone, FaAsterisk, FaGlobe, FaSuitcase, FaCertificate, FaCalendar, FaFacebook, FaInstagram, FaSnapchat, FaPinterest, FaTwitter, FaLinkedin } from 'react-icons/fa';

function JessicaResume() {
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
                                    <div className="w3-display-bottomleft w3-container w3-text-black">
                                        <h2>Jessica Lee Wang Ting</h2>
                                    </div>
                                </div>
                                <div className="w3-container">
                                    <p><FaBriefcase className="w3-margin-right w3-large w3-text-teal" />Student</p>
                                    <p><FaHome className="w3-margin-right w3-large w3-text-teal" />Singapore</p>
                                    <p><FaEnvelope className="w3-margin-right w3-large w3-text-teal" />jessWT10@gmail.com</p>
                                    <p><FaPhone className="w3-margin-right w3-large w3-text-teal" />88702836</p>
                                    <hr />
                                    <p className="w3-large"><b><FaAsterisk className="w3-margin-right w3-text-teal" />Technical Skills</b></p>
                                    <p>Adobe Creative Suite (Photoshop, Illustrator, InDesign)</p>
                                    <div className="progress-container">
                                        <div className="progress-bar" style={{ width: '90%', backgroundColor: '#009688' }}>90%</div>
                                    </div>
                                    <p> Digital design</p>
                                    <div className="progress-container">
                                        <div className="progress-bar" style={{ width: '80%', backgroundColor: '#009688' }}>80%</div>
                                    </div>
                                    <p>UI/IX Design </p>
                                    <div className="progress-container">
                                        <div className="progress-bar" style={{ width: '75%', backgroundColor: '#009688' }}>75%</div>
                                    </div>
                                    <br />
                                    <p className="w3-large w3-text-theme"><b><FaGlobe className="w3-margin-right w3-text-teal" />Soft skills</b></p>
                                    <p>- Creative</p>
                                    <p>- Adaptable </p>
                                    <p>- Open to feedback </p>
                                    <p>- organised </p>
                                    <br />
                                </div>
                            </div>
                            <br />
                        </div>
                        <div className="w3-twothird">

                            <div className="w3-container w3-card w3-white w3-margin-bottom">
                                <h2 className="w3-text-grey w3-padding-16"><FaSuitcase className="w3-margin-right w3-xxlarge w3-text-teal" />Experience</h2>
                                <div className="w3-container">
                                    <h5 className="w3-opacity"><b>Graphic designer Breworks Design & Communications Pte Ltd  </b></h5>
                                    <h6 className="w3-text-teal"><FaCalendar className="w3-margin-right" />June 2021 - Current</h6>
                                    <p>Designed using Adobe Creative Suite tools to create various digital and print materials, including brochures, banners, logos, and social media content.</p>
                                    <p>Collaborated with the marketing and product teams to create visually appealing designs for marketing campaigns, websites, and product packaging.</p>
                                    <p>Managed multiple projects simultaneously, ensuring all deadlines were met while maintaining high-quality design standards.</p>
                                    <hr />
                                </div>
                                <div className="w3-container">
                                    <h5 className="w3-opacity"><b>Designer Intern (Work Attachment) </b></h5>
                                    <h6 className="w3-text-teal"><FaCalendar className="w3-margin-right" />April 2020 - October 2020</h6>
                                    <p>Assisted the design team in creating digital and print materials, including social media graphics, posters, and brochures.</p>
                                    <p>Participated in brainstorming sessions to generate fresh design concepts and ideas.</p>
                                    <hr />
                                </div>
                            </div>
                            <div className="w3-container w3-card w3-white w3-margin-bottom">
                                <h2 className="w3-text-grey w3-padding-16"><FaCertificate className="w3-margin-right w3-xxlarge w3-text-teal" />Co-Curricular Activities</h2>
                                <div className="w3-container">
                                    <h5 className="w3-opacity"><b>Volleyball</b></h5>
                                    <h6 className="w3-text-teal"><FaCalendar className="w3-margin-right" />2014-2017</h6>
                                    <p>Participated in National school games twice.</p>
                                    <hr />
                                </div>
                            </div>
                            <div className="w3-container w3-card w3-white">
                                <h2 className="w3-text-grey w3-padding-16"><FaCertificate className="w3-margin-right w3-xxlarge w3-text-teal" />Education</h2>
                                <div className="w3-container">
                                    <h5 className="w3-opacity"><b>Crescent Girls'School</b></h5>
                                    <h6 className="w3-text-teal"><FaCalendar className="w3-margin-right" />January 2014 - November 2017</h6>
                                </div>
                                <div className="w3-container">
                                    <h5 className="w3-opacity"><b>Temasek Polytechnic</b></h5>
                                    <h6 className="w3-text-teal"><FaCalendar className="w3-margin-right" />April 2018 - April 2021</h6>
                                    <p>Diploma in Visual Communications.</p>
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

export default JessicaResume;
