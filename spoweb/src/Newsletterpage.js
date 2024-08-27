import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './NewsletterPage.css';

const NewsletterPage = () => {
  return (
    <div className="page-container">
      <AppBar position="static">
      <Toolbar sx={{ backgroundColor: 'gray' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tech Insights
          </Typography>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Subscribe</Button>
          <IconButton edge="end" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <div className="advertisement-left">
        <a href="https://example.com/ad1" target="_blank" rel="noopener noreferrer">
          <img src="https://tpc.googlesyndication.com/simgad/14756065433183481921" width={300} height={250} alt="Left Side Advertisement" className="img_ad" />
        </a>
      </div>
      
      <div className="advertisement-right">
        <a href="https://example.com/ad2" target="_blank" rel="noopener noreferrer">
          <img src="https://s0.2mdn.net/simgad/11750401867831595366" alt="Right Side Advertisement" width={300} height={250} style={{ display: 'block' }} />
        </a>
      </div>

      <div className="newsletter-container">
        <header className="newsletter-header">
          <h1>Tech Insights Weekly</h1>
          <p>Issue #42 - July 23, 2024</p>
        </header>
        
        <div className="advertisement-top">
          <a href="https://example.com/ad3" target="_blank" rel="noopener noreferrer">
            <img src="https://tpc.googlesyndication.com/simgad/983432388810850140" width={728} height={90} alt="Top Advertisement" className="img_ad" />
          </a>
        </div>

        <main className="newsletter-content">
          <section className="article">
            <h2>How to Identify and Avoid Scams</h2>
            <p>
              Scams come in many forms and can be highly convincing. Whether they appear as phishing emails, fake websites, or deceptive phone calls, it is crucial to be vigilant and informed. In this article, we’ll explore common scam tactics and provide tips on how to protect yourself from falling victim.
            </p>
            <p>
              <strong>1. Be Wary of Unsolicited Communication:</strong> One of the most common scam techniques is unsolicited communication. This could be an email, phone call, or message claiming that you’ve won a prize, owe money, or need to provide personal information. Always verify the authenticity of such communications before taking any action.
            </p>
            <p>
              <strong>2. Check for Red Flags:</strong> Scammers often use urgent or threatening language to create a sense of urgency. Be cautious of messages that demand immediate action or threaten severe consequences. Additionally, be skeptical of offers that seem too good to be true, such as large sums of money for minimal effort.
            </p>
            <p>
              <strong>3. Verify Contact Information:</strong> If you receive a suspicious message claiming to be from a legitimate organization, verify the contact details independently. For example, use official contact information from the organization’s website to get in touch and confirm if the communication is genuine.
            </p>
            <p>
              <strong>4. Use Multi-Factor Authentication (MFA):</strong> Multi-Factor Authentication adds an extra layer of security to your online accounts. Even if your password is compromised, MFA requires a second form of verification, such as a code sent to your phone, making it harder for scammers to gain access.
            </p>
            <p>
              <strong>5. Educate Yourself and Others:</strong> Staying informed about common scam tactics and sharing this knowledge with friends and family can help prevent scams. Regularly update your knowledge about new scam techniques and security practices to stay ahead of potential threats.
            </p>
            <p>
              <strong>6. Report Suspicious Activity:</strong> If you encounter a scam or suspect fraudulent activity, report it to the relevant authorities. Many countries have organizations dedicated to handling fraud and scams, and your report can help protect others from falling victim.
            </p>
            <p>
              By staying vigilant and informed, you can better protect yourself from scams and ensure your personal and financial information remains secure.
            </p>
          </section>

          <section className="article">
            <h2>Artificial Intelligence in Everyday Life</h2>
            <p>
              From virtual assistants to personalized recommendations, AI is becoming an integral part of our daily routines. This article delves into the various ways AI is enhancing user experiences, including its role in healthcare, finance, and entertainment. Learn about the latest AI technologies and how they are shaping the future.
            </p>
            <p>
              As AI systems become more advanced, they are increasingly capable of understanding and predicting user preferences. This has led to more accurate and efficient services, such as smarter search engines and more intuitive user interfaces. However, the rapid development of AI also raises important ethical questions about privacy and job displacement.
            </p>
          </section>
        </main>

        <footer className="newsletter-footer">
          <p>&copy; 2024 Tech Insights. All rights reserved.</p>
          <p>Follow us on <a href="#">Twitter</a> | <a href="#">Facebook</a> | <a href="#">LinkedIn</a></p>
        </footer>
      </div>
    </div>
  );
};

export default NewsletterPage;
