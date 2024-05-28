from abc import ABC, abstractmethod
from backend.scrapers.tools.sentiment_analysis.sentiment_analysis import SentimentAnalyzer

class Scraper(ABC):
    def __init__(self, urls, threshold):
        self.sentiment_analyzer = SentimentAnalyzer()
        self.urls = urls
        self.threshold = threshold

    def execute(self):
        return self.extract_news_from_source(self.urls)

    @abstractmethod
    def extract_news_from_source(self, urls):
        pass

