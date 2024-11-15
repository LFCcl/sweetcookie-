const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 4000;


const corsOptions = {
  origin: 'https://jessicaresume.netlify.app', // Your Netlify URL  
  //origin: 'https://localhost:3000', //localhost, update with Netlify URL
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/api/ipqualityscore/:ip', async (req, res) => {
  try {
    const ip = req.params.ip;
    const apiKey = 'jCXGMOuvErBqPFEjz49MLSnhZvnsIQCR';
    const url = `https://www.ipqualityscore.com/api/json/ip/${apiKey}/${ip}?strictness=0&allow_public_access_points=true&fast=true&lighter_penalties=true&mobile=true`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching data from IPQualityScore for IP ${ip}:`, error.message);
    res.status(500).json({ error: 'Error fetching data from IPQualityScore' });
  }
});

// "message" here is send to the render logs 
app.post('/api/log', async (req, res) => {
  try {
    const { message } = req.body;
    const key = "my-secret-key-256bitslong1234!";  // This can be any string, it will be hashed to 32 bytes
    // Encryption function 
    const crypto = require('crypto');
    // AES Encryption function using AES-256-CBC
    function encryptMessage(message, key) {
      // Ensure the key is exactly 32 bytes (256 bits)
      const key256 = crypto.createHash('sha256').update(key).digest();  // Hash the key to 32 bytes
      const iv = crypto.randomBytes(16);  // Generate a random IV (16 bytes for AES-256-CBC)

      const cipher = crypto.createCipheriv('aes-256-cbc', key256, iv);

      let encrypted = cipher.update(message, 'utf8', 'base64');
      encrypted += cipher.final('base64');

      // Return the encrypted message along with the IV used for encryption (IV is needed for decryption)
      return iv.toString('base64') + ':' + encrypted;
    }
    if (!message) {
      throw new Error('Message is missing in request body');
    }
    const e_Message = encryptMessage(message, key);
    console.log("content : ", e_Message);

    res.status(200).send('Log received');
  } catch (error) {
    console.error(`Error in /api/log: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});
