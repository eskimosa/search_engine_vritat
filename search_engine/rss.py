import feedparser
import ssl
import requests
from bs4 import BeautifulSoup
from datetime import datetime
from .sentiment_analysis import sentiment_rate

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


def extract_news_from_rss(rss_urls):
    all_news = []
    # id = 1
    for url in rss_urls:
        feed = feedparser.parse(url)
        category = feed.feed.title
        for entry in feed.entries:
            sentiment = sentiment_rate(entry.link)
            if sentiment > 0.5:
                published_date = convert_published_date(entry.published)
                summary = entry.summary if entry.summary else 'No data'
                news_entry = {
                    # 'id': id,
                    'category': category,
                    'title': entry.title,
                    'link': entry.link,
                    'published': published_date,
                    'summary': summary,
                    'content': extract_article_content(entry.link),
                    'sentiment': sentiment
                }
                all_news.append(news_entry)
                # id += 1
    return all_news



