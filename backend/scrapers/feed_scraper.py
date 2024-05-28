from abc import ABC, abstractmethod
from backend.scrapers.tools.sentiment_analysis.sentiment_analysis import SentimentAnalyzer
from .tools.save_news.save_news import SaveNews

class Scraper(ABC):
    def __init__(self, urls, threshold):
        self.sentiment_analyzer = SentimentAnalyzer()
        self.save_news = SaveNews()
        self.urls = urls
        self.threshold = threshold

    def execute(self):
        '''receives: list of urls;
            does:fetches news from source;
            returns: list of all news
        '''
        fetched_news = self.extract_news_from_source(self.urls)

        '''receives: list of news;
            does: performs sentiment analysis on each article;
            returns: list of news that passed sent criteria, expanded with sentiment field
        '''
        analyzed_news = self.sentiment_analyzer.sentiment_rate(fetched_news, self.threshold)

        '''receives: list of news passed sentiment analysis;
            does: validates the received data and saves it to model;
            returns: list of validated data
        '''
        return self.save_news.save_news(analyzed_news)


    @abstractmethod
    def extract_news_from_source(self, urls):
        pass



'''
elpais = Plugin(urls=source_urls, threshold=0.5)
elpais.execute()
'''

