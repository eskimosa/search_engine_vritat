import json


def get_rss():
    with open('search_engine/source_urls.json', 'r') as file:
        urls_data = file.read()
        urls = json.loads(urls_data)
    return urls

