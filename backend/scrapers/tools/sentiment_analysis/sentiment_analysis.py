from textblob import TextBlob
from newspaper import Article
import nltk

nltk.download('punkt', quiet=True)

class SentimentAnalyzer:
    def sentiment_rate(self, url):
        article = Article(url)
        article.download()
        article.parse()
        article.nlp()
        text = article.text
        blob = TextBlob(text)
        sentiment = round(blob.sentiment.polarity, 2)
        return sentiment

