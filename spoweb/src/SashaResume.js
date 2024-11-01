import React from 'react';
import { FaBriefcase, FaHome, FaEnvelope, FaPhone, FaAsterisk, FaGlobe, FaSuitcase, FaCertificate, FaCalendar, FaFacebook, FaInstagram, FaSnapchat, FaPinterest, FaTwitter, FaLinkedin } from 'react-icons/fa';
//import boyImage from './boy.png';

function SashaResume() {
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
                 ul {
            list-style-type: disc; /* Bullet points */
            margin-left: 20px; /* Indent the list */
        }
            
        }
            `}</style>

            <div className="w3-light-grey">
                <div className="w3-content w3-margin-top" style={{ maxWidth: '1400px', border: '0px solid red' }}>
                    <div className="w3-row-padding" style={{ border: '0px solid green', display: 'flex', flexDirection: 'row' }}>
                        <div className="w3-third">
                            <div className="w3-white w3-text-grey w3-card-4">
                                <div className="w3-display-container">
                                    <div className="w3-display-bottomleft w3-container w3-text-black">
                                        <h2>Sasha Zhang Xue Chun</h2>
                                    </div>
                                </div>
                                <div className="w3-container">
                                    <p><FaBriefcase className="w3-margin-right w3-large w3-text-teal" />Student</p>
                                    <p><FaHome className="w3-margin-right w3-large w3-text-teal" />Singapore</p>
                                    <p><FaEnvelope className="w3-margin-right w3-large w3-text-teal" />sashafireglow89@gmail.com</p>
                                    <p><FaPhone className="w3-margin-right w3-large w3-text-teal" />90395626</p>
                                    <hr />
                                    <p className="w3-large"><b><FaAsterisk className="w3-margin-right w3-text-teal" />Programming Languages</b></p>
                                    <p>Python</p>
                                    <div className="progress-container">
                                        <div className="progress-bar" style={{ width: '70%', backgroundColor: '#009688' }}>70%</div>
                                    </div>
                                    <p>Java</p>
                                    <div className="progress-container">
                                        <div className="progress-bar" style={{ width: '60%', backgroundColor: '#009688' }}>60%</div>
                                    </div>
                                    <p>SQL</p>
                                    <div className="progress-container">
                                        <div className="progress-bar" style={{ width: '60%', backgroundColor: '#009688' }}>60%</div>
                                    </div>
                                    <p>Tableau</p>
                                    <div className="progress-container">
                                        <div className="progress-bar" style={{ width: '50%', backgroundColor: '#009688' }}>50%</div>
                                    </div>
                                    <br />
                                    <p className="w3-large w3-text-theme"><b><FaGlobe className="w3-margin-right w3-text-teal" />Microsoft office</b></p>
                                    <p>Word</p>
                                    <div className="progress-container">
                                        <div className="progress-bar" style={{ width: '90%', backgroundColor: '#009688' }}>90%</div>
                                    </div>
                                    <p>Excel</p>
                                    <div className="progress-container">
                                        <div className="progress-bar" style={{ width: '70%', backgroundColor: '#009688' }}>70%</div>
                                    </div>
                                    <p>PowerPoint</p>
                                    <div className="progress-container">
                                        <div className="progress-bar" style={{ width: '90%', backgroundColor: '#009688' }}>90%</div>
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
                                    <h5 className="w3-opacity"><b>Data Analyst Intern</b></h5>
                                    <h6 className="w3-text-teal"><FaCalendar className="w3-margin-right" />May 2024 - Aug 2024</h6>
                                    <ul>
                                        <li>Used Tableau to create simple but insightful dashboards and analyze financial market data.</li>
                                        <li>Presented insights derived from dashboards at weekly meetings to management, thus allowing the company to take data-driven business decisions.</li>
                                        <li>Coded Python script to automate data extraction and cleaning to improve the efficiency of the company.</li>
                                    </ul>
                                    <hr />
                                </div>
                                <div className="w3-container">
                                    <h5 className="w3-opacity"><b>Barista at Starbucks</b></h5>
                                    <h6 className="w3-text-teal"><FaCalendar className="w3-margin-right" />May 2023 - Aug 2023</h6>
                                    <ul>
                                        <li>Led a team of 5 in serving customers efficiently during peak hours, showcasing leadership and effective communication.</li>
                                        <li>Verified inventory by investigating discrepancies and suggesting solutions to prevent wastage, therefore improving profit margins of the store.</li>
                                    </ul>
                                    <hr />
                                </div>
                            </div>
                            <div className="w3-container w3-card w3-white w3-margin-bottom">
                                <h2 className="w3-text-grey w3-padding-16"><FaCertificate className="w3-margin-right w3-xxlarge w3-text-teal" />Education</h2>
                                <div className="w3-container">
                                    <h5 className="w3-opacity"><b>Bachelor Science in Data Science and Analytics at NUS</b></h5>
                                    <h6 className="w3-text-teal"><FaCalendar className="w3-margin-right" />Aug 2022 - Current</h6>
                                    <p>GPA: 4.43</p>
                                    <hr />
                                </div>
                            </div>
                            <div className="w3-container w3-card w3-white w3-margin-bottom">
                                <h2 className="w3-text-grey w3-padding-16"><FaCertificate className="w3-margin-right w3-xxlarge w3-text-teal" />Projects</h2>
                                <div className="w3-container">
                                    <h5 className="w3-opacity"><b>Data Analytics Project Work</b></h5>
                                    <h6 className="w3-text-teal"><FaCalendar className="w3-margin-right" />Aug 2023 - Dec 2023</h6>
                                    <ul>
                                        <li>Collaborated as a group of 4 to present insights about dengue cases via python and R.</li>
                                        <li>Web scraped NEA website to extract data about weekly dengue cases.</li>
                                    </ul>
                                    <hr />
                                </div>
                            </div>

                            <div className="w3-container w3-card w3-white w3-margin-bottom">
                                <h2 className="w3-text-grey w3-padding-16"><FaCertificate className="w3-margin-right w3-xxlarge w3-text-teal" />Co-Curricular Activities</h2>
                                <div className="w3-container">
                                    <h5 className="w3-opacity"><b>Volunteer, Care Corner</b></h5>
                                    <h6 className="w3-text-teal"><FaCalendar className="w3-margin-right" />Jan 2022 - Jul 2022</h6>
                                    <ul>
                                        <li>Organised and planned after-school activities for children from needy families.</li>
                                    </ul>
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

export default SashaResume;
