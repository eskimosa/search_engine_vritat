import json
import os

def get_la_vanguardia_urls():
    base_dir = os.path.dirname(os.path.abspath(__file__))  # This should point to backend directory
    file_path = os.path.join(base_dir, 'scrapers', 'la_vanguardia', 'la_vanguardia_urls.json')  # Construct the path to the JSON file

    with open(file_path, 'r') as file:
        urls_data = file.read()
        urls = json.loads(urls_data)
    return urls

