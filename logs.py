# This code is for the extraction of data from the Render logs 

import requests
from pprint import pprint
from Crypto.Cipher import AES
from Crypto.Protocol.KDF import scrypt
from Crypto.Util.Padding import unpad
import base64
import hashlib

def get_IP_Info(ip_address):
    apiKey = 'jCXGMOuvErBqPFEjz49MLSnhZvnsIQCR'
    url = f"https://www.ipqualityscore.com/api/json/ip/{apiKey}/{ip_address}?strictness=0&allow_public_access_points=true&fast=true&lighter_penalties=true&mobile=true"
    ip_quality_score_response = requests.get(url=url)

    if ip_quality_score_response.status_code == 200:
        ip_quality_score_data = ip_quality_score_response.json()
        # print(ip_quality_score_data)
        keys_to_keep = ["fraud_score", "region", "ISP", "vpn", "latitude", "longitude"]
        IPinfo_dict = {key:ip_quality_score_data[key] for key in keys_to_keep if key in ip_quality_score_data}
    # print(output_dict)
    return IPinfo_dict

def get_logs():
    apikey = "rnd_ymTA1UcFxhv9FneHEigwBny3u2nw"  # Replace with your actual API key
    resource = "srv-csu41ol2ng1s73cc4j60"  # Replace with the resource you're querying logs for
    limit = "100"  # Number of logs you want to fetch

    # Endpoint URL
    endpoint = "https://api.render.com/v1/logs"

    # Headers, including the authorization (API key)
    headers = {
        'Authorization': f'Bearer {apikey}',
        'accept': 'application/json'
    }

    # Parameters to be passed to the API
    params = {
        'ownerId': "LFCcl2020@proton.me",
        'resource': resource,
        'limit': limit,
        'text': 'content'
    }

    try:
        # Make a GET request (POST is used if required by the API)
        response = requests.get(endpoint, headers=headers, params=params)
        
        # Check if the request was successful
        if response.status_code == 200:
            logs = response.json()  # Convert the response to JSON
            pprint(logs)
            return logs
        else:
            print(f"Failed to fetch logs: {response.status_code}")
            print(response.text)
            return None
    except requests.exceptions.RequestException as e:
        print(f"Error occurred: {e}")
        return None
    
def decrypt_AES_message(encrypted_message):
    key = "my-secret-key-256bitslong1234!"; 
    # Ensure the key is exactly 32 bytes (256 bits)
    key256 = hashlib.sha256(key.encode()).digest()

    # Split the encrypted message into IV and encrypted text parts
    try:

        _, iv_b64, encrypted_b64 = encrypted_message.split(':', 2)  # Split twice
        iv_b64 = iv_b64.strip()
        encrypted_b64 = encrypted_b64.strip()

    except ValueError:
        print("Error: Encrypted message format is invalid. Expected one ':' separating IV and encrypted message.")
        return None
    
    iv = base64.b64decode(iv_b64)
    encrypted_text = base64.b64decode(encrypted_b64)

    # Create the AES cipher with the key and IV
    cipher = AES.new(key256, AES.MODE_CBC, iv)

    # Decrypt and unpad the message
    decrypted = unpad(cipher.decrypt(encrypted_text), AES.block_size)

    # Convert the decrypted bytes to a string
    return decrypted.decode('utf-8')

def decodedbase64message(DEmessage): 
    decodedmessage = base64.b64decode(DEmessage).decode('utf-8')
    return decodedmessage

def decodedmessage(message):
    decrypt_message = decrypt_AES_message(message)
    decrypt_message = decodedbase64message(decrypt_message)

    return decrypt_message

def process_logs(log):
    message = {
        "ip_address": None,       # str (varchar(50))
        "type": None,             # str (varchar(255)) (General/WebRTC)
        "source": None,           # str (varchar(255)) (Captcha)
        "unique_identifier": None, #(https://jessicaresume.netlify.app/)
        "timestamp": None,        # str (datetime in ISO format)
    }

    message['timestamp']  = log['timestamp']
    encoded_message = log["message"]
    decoded_message = decodedmessage(encoded_message)
    print("\n--- Extracted Content ---")
    print(decoded_message)
    type_of_ip, ip_address, unique_identifier = splitted_message(decoded_message)
    message["type"] = type_of_ip
    message["ip_address"] = ip_address
    message["unique_identifier"] = unique_identifier
    message["source"] = "Captcha"
    IPinfo_dict =  get_IP_Info(ip_address)
    message.update(IPinfo_dict)
    return message

def splitted_message(logsmessage): 
    try:
        label, ip_address, unique_identifier = logsmessage.split(':', 2)  # Split twice
        label = label.strip()
        ip_address = ip_address.strip()
        unique_identifier = unique_identifier.strip()
        if "WebRTC IP Address" in label:
            return "WebRTC", ip_address, unique_identifier
        if "IP Address" in label:
            return "General", ip_address, unique_identifier
        print(label, ip_address, unique_identifier)
    
    except ValueError:
        print("Error: decoded_message format is invalid. Expected one ':' separating label and detail.")
        return None

def main():
    logs = get_logs()
    logs = logs['logs']
    for log in logs:
        if 'content' in log['message']: 
            send = process_logs(log)
            print("\n--- Logs send to server ---")
            print(send)
    
    pass

if __name__  == "__main__":
    main()
    pass
