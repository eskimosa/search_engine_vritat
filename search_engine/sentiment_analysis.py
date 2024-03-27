from textblob import TextBlob
from newspaper import Article


def sentiment_rate(url):
    article = Article(url)
    article.download()
    article.parse()
    article.nlp()
    text = article.text
    blob = TextBlob(text)
    sentiment = round(blob.sentiment.polarity, 2)
    return sentiment

