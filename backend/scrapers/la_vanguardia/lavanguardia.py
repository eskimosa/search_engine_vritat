import feedparser
import requests
from bs4 import BeautifulSoup
from datetime import datetime
from django.db.models import Q
import ssl
from backend.scrapers.feed_scraper import Scraper
from backend.models import News

if hasattr(ssl, '_create_unverified_context'):
    ssl._create_default_https_context = ssl._create_unverified_context

class LaVanguardiaPlugin(Scraper):
    def extract_article_content(self, url):
        response = requests.get(url)
        html_content = response.text

        soup = BeautifulSoup(html_content, 'lxml')
        paragraphs = soup.find_all('p', class_='paragraph')
        p_content = []
        for p in paragraphs:
            p_content.append(p.text)
        return '\n'.join(p_content)

    def convert_published_date(self, date):
        date_obj = datetime.strptime(date, '%d %b %Y %H:%M:%S %z')
        formatted_date = date_obj.strftime('%Y-%m-%d')
        return formatted_date

    def extract_news_from_source(self, urls):
        all_news = []
        for url in urls:
            feed = feedparser.parse(url)
            category = feed.feed.title
            for entry in feed.entries:
                published_date = self.convert_published_date(entry.published)
                summary = entry.summary if entry.summary else 'No data'
                if not News.objects.filter(Q(title=entry.title) | Q(link=entry.link)).exists():
                    news_entry = {
                        'source': 'La Vanguardia',
                        'category': category,
                        'title': entry.title,
                        'link': entry.link,
                        'published': published_date,
                        'summary': summary,
                        'content': self.extract_article_content(entry.link),
                    }
                    all_news.append(news_entry)
        return all_news
