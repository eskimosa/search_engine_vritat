from textblob import TextBlob
from newspaper import Article
import nltk

nltk.download('punkt', quiet=True)

class SentimentAnalyzer:
    def sentiment_rate(self, fetched_news, threshold):
        analyzed_news = []
        for article in fetched_news:
            text = article['content']
            blob = TextBlob(text)
            sentiment = round(blob.sentiment.polarity, 2)
            if sentiment >= threshold:
                article['sentiment'] = sentiment
                analyzed_news.append(article)
        return analyzed_news
