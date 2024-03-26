from textblob import TextBlob
from newspaper import Article

url = 'https://www.lavanguardia.com/natural/20240326/9582627/70-regiones-produccion-vino-seran-afectadas-cambio-climatico.html'
article = Article(url)
article.download()
article.parse()
article.nlp()
text = article.text
blob = TextBlob(text)
sentiment = blob.sentiment.polarity
print(sentiment)
