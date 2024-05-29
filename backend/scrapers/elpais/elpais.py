import feedparser
import requests
from bs4 import BeautifulSoup
from datetime import datetime
from django.db.models import Q
import ssl
from backend.scrapers.feed_scraper import Scraper
from backend.models import News
from dateutil import parser

if hasattr(ssl, '_create_unverified_context'):
    ssl._create_default_https_context = ssl._create_unverified_context

class ElPaisPlugin(Scraper):

    def convert_published_date(self, date):
        try:
            date_obj = parser.parse(date)
            formatted_date = date_obj.strftime('%Y-%m-%d')
            return formatted_date
        except (ValueError, OverflowError) as e:
            print(f"Error parsing date: {e}")
            return None

    def extract_news_from_source(self, urls):
        all_news = []
        for url in urls:
            feed = feedparser.parse(url)
            category = feed.feed.title
            for entry in feed.entries:
                published_date = self.convert_published_date(entry.published)
                summary = entry.summary if entry.summary else 'No data'
                content = ''
                if 'content' in entry and len(entry.content) > 1:
                    content = entry.content[1].get('value', 'Content not available')
                elif 'content' in entry and len(entry.content) > 0:
                    content = entry.content[0].get('value', 'Content not available')
                if not News.objects.filter(Q(title=entry.title) | Q(link=entry.link)).exists():
                    news_entry = {
                        'category': category,
                        'title': entry.title,
                        'link': entry.link,
                        'published': published_date,
                        'summary': summary,
                        'content': content,
                    }
                    all_news.append(news_entry)
        print(all_news)
        return all_news