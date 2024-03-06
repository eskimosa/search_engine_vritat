import feedparser
import ssl
import requests
from bs4 import BeautifulSoup


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
    feed = feedparser.parse(rss_url)

    news_entries = []
    for entry in feed.entries:
        news_entry = {
            'title': entry.title,
            'link': entry.link,
            'published': entry.published,
            'summary': entry.summary
        }

        article_content = extract_article_content(entry.link)
        news_entry['content'] = article_content

        news_entries.append(news_entry)

    return news_entries


if __name__ == '__main__':
    rss_url = 'https://www.lavanguardia.com/rss/local/barcelona.xml'
    news = extract_news_from_rss(rss_url)
    for entry in news:
        print("Title:", entry['title'])
        print("Link:", entry['link'])
        print("Published:", entry['published'])
        print("Summary:", entry['summary'])
        print("Content:", entry['content'])


