#This code is user to download the Json file from Canary web link and extract the useful information

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.chrome.options import Options
from time import sleep
import os
import json 
import time 

# Path to your download folder and the specific file (this part might have to edit on anydesk)
DOWNLOAD_FOLDER = "C:Users/q1htx/Downloads"
FILE_NAME = "2wsz4olfs7umhmjj7qknstdtp.json" # File name is fixed
# FILE_PATH = os.path.join(DOWNLOAD_FOLDER, FILE_NAME)
FILE_PATH = r"C:/Users/q1htx/Downloads\\2wsz4olfs7umhmjj7qknstdtp.json"

#List created to store records of hit recorded so that it wont repeat
processed_hits = []

# Downloading json file from canarytoken URL
def download_json(url, download_button_XPATH,):
    # Ensure the download directory exists
    os.makedirs(DOWNLOAD_FOLDER, exist_ok=True)

    # If the file already exists, delete it
    if os.path.exists(FILE_PATH):
        print(f"File {FILE_NAME} already exists. Deleting the old file...")
        os.remove(FILE_PATH)

    # Set up Chrome options to specify the download directory
    options = Options()

    preferences = {
        "download.default_directory": DOWNLOAD_FOLDER,  # Set custom download path
        "download.prompt_for_download": False,  # Disable download prompt
        "download.directory_upgrade": True  # Allow directory to be used
    }
    options.add_experimental_option("prefs", preferences)
    options.add_argument("--headless")  # Run in headless mode
    options.add_argument("--disable-gpu")  # Avoid unnecessary GPU usage

    # Initialize the WebDriver
    driver = webdriver.Chrome(options=options)
    try:
        # Navigate to the URL
        driver.get(url)
        # Find the download button and click it
        download_button = driver.find_element(By.XPATH, download_button_XPATH)
        ActionChains(driver).move_to_element(download_button).click().perform()
        # Wait for the file to be downloaded (can adjust time if needed)
        time.sleep(2) # Adjust based on download speed
    finally:
        driver.quit()

#Process to filter new data, and update the downloaded_hits set.
def get_json_file(json_file):
    try:
        with open(json_file, "r") as file:
            data = json.load(file)
            # Print the entire JSON file (optional, for debugging purposes)
            # print("\n--- Downloaded JSON Content ---")
            # print(json.dumps(data, indent=4))
            selected_data = process_data(data)
            return selected_data  # Return the list of dictionaries
        
    except Exception as e:
        print(f"Error processing the JSON file: {e}")
        return
    
#Function to process the data and extract the needed information, 
#setting what data we need from the canary list as there is many data but we wont need everything 
def process_data(data):
    all_entries =  []
                
    for hit in data.get("hits", []):
        message = {
                        "time_of_hit": None,
                        "ip_address": None,
                        "Region": None,
                        "ISP": None,
                        "postal_code": None,
                        "Domain": None,
                        "user_agent": None
        }
    
        message["time_of_hit"]  = hit.get("time_of_hit")
        message["ip_address"] = hit.get("src_ip")
        message["Region"] = hit.get("geo_info", {}).get("region")
        message["ISP"] = hit.get("geo_info", {}).get("org")
        message["postal_code"] = hit.get("geo_info", {}).get("postal")
        message["Domain"] = hit.get("geo_info", {}).get("asn", {}).get("domain")
        message["user_agent"] = hit.get("useragent")

        all_entries.append(message)
    return all_entries

#Keep track of the time of hit 
def record(selected_data):
    record =[]
    for time in selected_data:
        time_of_hit = time.get("time_of_hit")
        record.append(time_of_hit)
    return record

#Check with the time of hit to only take in new data 
def filter_new_data(selected_data):
    global processed_hits
    new_data = []
    for entry in selected_data:
        if entry["time_of_hit"] not in processed_hits:
            new_data.append(entry)
            processed_hits.append(entry["time_of_hit"])
    return new_data

# Main function of this code 
def main():
    #Provide detail on webpage
    url = 'https://canarytokens.org/nest/history/8a532717bb0ff001895267f72788eb5e/2wsz4olfs7umhmjj7qknstdtp'  # Your URL
    download_button_XPATH = '//button[span[text()="JSON"]]'  # XPath for the button

    while True:  # Infinite loop to run every hour
        print("\nStarting new download cycle...")
        #Download Json file
        download_json(url, download_button_XPATH)
        json_file = 'C:/Users/q1htx/Downloads/2wsz4olfs7umhmjj7qknstdtp.json'
        print("\n--- Extracted Content ---")
        selected_data = get_json_file(json_file)
        print(json.dumps(selected_data, indent=4))

        # Filter for new data
        new_data = filter_new_data(selected_data)
        if new_data:
            print(f"\n--- New Data Extracted ---\n{json.dumps(new_data, indent=4)}")
        else:
            print("\nNo new data found.")

        # Wait for 1 hour (3600 seconds) before the next download
        print("\nWaiting for the next cycle...\n")
        time.sleep(15)
      
# Good Practice to have this line, so that this code can be call somewhere else
if __name__ == "__main__":
    main()
