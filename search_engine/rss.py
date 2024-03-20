import feedparser
import ssl
import requests
from bs4 import BeautifulSoup
from datetime import datetime


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
    return '\n'.join(p_content)


def convert_published_date(date):
    date_obj = datetime.strptime(date, '%d %b %Y %H:%M:%S %z')
    formatted_date = date_obj.strftime('%Y-%m-%d')
    return formatted_date



def extract_news_from_rss(rss_url):
    all_news = []
    for url in rss_url:
        feed = feedparser.parse(url)
        category = feed.feed.title
        for entry in feed.entries:
            # entry_date = datetime.strptime(entry.published, "%a, %d %b %Y %H:%M:%S %z")
            published_date = convert_published_date(entry.published)
            news_entry = {
                'category': category,
                'title': entry.title,
                'link': entry.link,
                'published': published_date,
                'summary': entry.summary,
                'content': extract_article_content(entry.link)
            }
            all_news.append(news_entry)
    return all_news



