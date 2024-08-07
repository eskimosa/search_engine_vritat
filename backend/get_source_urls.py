import json
import os

base_dir = os.path.dirname(os.path.abspath(__file__))
def get_la_vanguardia_urls():
    file_path = os.path.join(base_dir, 'scrapers', 'la_vanguardia', 'la_vanguardia_urls.json')

    with open(file_path, 'r') as file:
        urls_data = file.read()
        urls = json.loads(urls_data)
    return urls

def get_elpais_urls():
    file_path = os.path.join(base_dir, 'scrapers', 'elpais', 'elpais_urls.json')

    with open(file_path, 'r') as file:
        urls_data = file.read()
        urls = json.loads(urls_data)
    return urls

def get_abc_urls():
    file_path = os.path.join(base_dir, 'scrapers', 'abc', 'abc_urls.json')

    with open(file_path, 'r') as file:
        urls_data = file.read()
        urls = json.loads(urls_data)
    return urls


def get_el_periodico_urls():
    file_path = os.path.join(base_dir, 'scrapers', 'el_periodico', 'el_periodico_urls.json')

    with open(file_path, 'r') as file:
        urls_data = file.read()
        urls = json.loads(urls_data)
    return urls
