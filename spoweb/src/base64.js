// Your message to encode
let message = "IP address = 192.168.100.36";

// Encode the message to base64
let encodedMessage = btoa(message);

console.log(encodedMessage);  // Outputs: "SGVsbG8sIHdvcmxkIQ=="

let decodedMessage = atob(encodedMessage);
console.log(decodedMessage);  // Outputs the original message
