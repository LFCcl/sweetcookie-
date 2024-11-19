// AES (Advanced Encryption Standard). AES is a symmetric-key encryption algorithm, meaning the same key is used for both encryption and decryption. 
//It is widely used in secure data transmission and storage.
// If you're in Node.js, use `require` to include CryptoJS
// const CryptoJS = require("crypto-js");

// // AES Encryption function
// function encryptMessage(message, key) {
//     // Encrypt the message using AES
//     const encrypted = CryptoJS.AES.encrypt(message, key).toString();
//     return encrypted;
// }

// // AES Decryption function
// function decryptMessage(encryptedMessage, key) {
//     // Decrypt the message using AES
//     const decrypted = CryptoJS.AES.decrypt(encryptedMessage, key);
//     const decryptedMessage = decrypted.toString(CryptoJS.enc.Utf8);
//     return decryptedMessage;
// }

// // Example usage
// (function () {
//     const message = "Hello, this is a secret message!";
//     const key = "my-secret-key";  // Simple string key (can be any string)
//     console.log(message);
//     // Encrypt the message
//     const encryptedMessage = encryptMessage(message, key);
//     console.log("Encrypted message:", encryptedMessage);

//     // Decrypt the message
//     const decryptedMessage = decryptMessage(encryptedMessage, key);
//     console.log("Decrypted message:", decryptedMessage);
// })();
const crypto = require('crypto');

// // AES Encryption function using AES-256-CBC
// function encryptMessage(message, key) {
//     // Ensure the key is exactly 32 bytes (256 bits)
//     const key256 = crypto.createHash('sha256').update(key).digest();  // Hash the key to 32 bytes
//     const iv = crypto.randomBytes(16);  // Generate a random IV (16 bytes for AES-256-CBC)

//     const cipher = crypto.createCipheriv('aes-256-cbc', key256, iv);

//     let encrypted = cipher.update(message, 'utf8', 'base64');
//     encrypted += cipher.final('base64');

//     // Return the encrypted message along with the IV used for encryption (IV is needed for decryption)
//     return iv.toString('base64') + ':' + encrypted;
// }

// AES Decryption function using AES-256-CBC
function decryptMessage(encryptedMessage, key) {
    // Ensure the key is exactly 32 bytes (256 bits)
    const key256 = crypto.createHash('sha256').update(key).digest();  // Hash the key to 32 bytes

    const parts = encryptedMessage.split(':');
    const iv = Buffer.from(parts[0], 'base64');
    const encryptedText = parts[1];

    const decipher = crypto.createDecipheriv('aes-256-cbc', key256, iv);

    let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}

// Example usage
(function () {
    //const message = "Hello, this is a secret message!";
    //const message = " SVAgQWRkcmVzczogMTE4LjE4OS4xMzYuOTAsIFB1YmxpYyBJUCwgU0c=";
    const key = "my-secret-key-256bitslong1234!";  // This can be any string, it will be hashed to 32 bytes
    const encryptedMessage = "CUqzwQLDmKzzoy8XApG1lQ==:omNQ4LU6n13yrWCk99w9KbftRy/OCLuYXqnlHN6gD+FJPzbbP1dgHQst7Y4qm66k"
    //console.log("Original Message:", message);

    // // Encrypt the message
    // const encryptedMessage = encryptMessage(message, key);
    // console.log("Encrypted message:", encryptedMessage);

    // Decrypt the message
    const decryptedMessage = decryptMessage(encryptedMessage, key);
    console.log("Decrypted message:", decryptedMessage);
})();

