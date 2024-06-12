import feedparser
import requests
from django.db.models import Q
import ssl
from backend.scrapers.feed_scraper import Scraper
from backend.models import News
from dateutil import parser

if hasattr(ssl, '_create_unverified_context'):
    ssl._create_default_https_context = ssl._create_unverified_context

class AbcPlugin(Scraper):
    def convert_published_date(self, date):
        try:
            date_obj = parser.parse(date)
            formatted_date = date_obj.strftime('%Y-%m-%d')
            return formatted_date
        except (ValueError, OverflowError) as e:
            print(f"Error parsing date: {e}")
            return None

    def fetch_feed(self, url):
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return response.content

    def extract_news_from_source(self, urls):
        all_news = []
        for url in urls:
            try:
                feed_content = self.fetch_feed(url)
                feed = feedparser.parse(feed_content)
                category = feed.feed.title
                for entry in feed.entries:
                    published_date = self.convert_published_date(entry.published)
                    if not News.objects.filter(Q(title=entry.title) | Q(link=entry.link)).exists():
                        news_entry = {
                            'source': 'ABC',
                            'category': category,
                            'title': entry.title,
                            'link': entry.link,
                            'published': published_date,
                            'summary': entry.title,
                            'content': entry.description,
                        }
                        all_news.append(news_entry)
            except requests.exceptions.RequestException as e:
                print(f"Error fetching the feed from {url}: {e}")
            except Exception as e:
                print(f"An error occurred while processing the feed from {url}: {e}")
        return all_news