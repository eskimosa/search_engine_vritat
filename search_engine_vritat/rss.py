import feedparser
import ssl
import requests
from bs4 import BeautifulSoup
import json


if hasattr(ssl, '_create_unverified_context'):
    ssl._create_default_https_context = ssl._create_unverified_context


def extract_article_content(url):
    response = requests.get(url)
    html_content = response.text

    soup = BeautifulSoup(html_content, 'lxml')
    paragraphs = soup.find_all('p', class_='paragraph')
    p_content = []
    for p in paragraphs:
        p_content.append(p.text)
    return p_content


def extract_news_from_rss(rss_url):
    all_news = []
    for url in rss_url:
        feed = feedparser.parse(url)
        feed_category = feed.feed.title
        # news_entries = []
        for entry in feed.entries:
            news_entry = {
                'feed_category': feed_category,
                'title': entry.title,
                'link': entry.link,
                'published': entry.published,
                'summary': entry.summary
            }
            article_content = extract_article_content(entry.link)
            news_entry['content'] = article_content
            # news_entries.append(news_entry)
            all_news.append(news_entry)
    return all_news


if __name__ == '__main__':
    with open('urls.json', 'r') as file:
        urls_data = file.read()

    urls = json.loads(urls_data)
    rss_urls = urls['urls']
    news = extract_news_from_rss(rss_urls)
    for entry in news:
        print("Category:", entry['feed_category'])
        print("Title:", entry['title'])
        print("Link:", entry['link'])
        print("Published:", entry['published'])
        print("Summary:", entry['summary'])
        print("Content:", entry['content'])


