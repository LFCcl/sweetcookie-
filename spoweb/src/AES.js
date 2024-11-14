// If you're in Node.js, use `require` to include CryptoJS
const CryptoJS = require("crypto-js");

// AES Encryption function
function encryptMessage(message, key) {
    // Encrypt the message using AES
    const encrypted = CryptoJS.AES.encrypt(message, key).toString();
    return encrypted;
}

// AES Decryption function
function decryptMessage(encryptedMessage, key) {
    // Decrypt the message using AES
    const decrypted = CryptoJS.AES.decrypt(encryptedMessage, key);
    const decryptedMessage = decrypted.toString(CryptoJS.enc.Utf8);
    return decryptedMessage;
}

// Example usage
(function () {
    const message = "Hello, this is a secret message!";
    const key = "my-secret-key";  // Simple string key (can be any string)
    console.log(message);
    // Encrypt the message
    const encryptedMessage = encryptMessage(message, key);
    console.log("Encrypted message:", encryptedMessage);

    // Decrypt the message
    const decryptedMessage = decryptMessage(encryptedMessage, key);
    console.log("Decrypted message:", decryptedMessage);
})();
