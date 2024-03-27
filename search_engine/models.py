from django.db import models


# Create your models here.
class News(models.Model):
    category = models.CharField(max_length=250)
    title = models.TextField()
    link = models.URLField()
    published = models.DateField()
    summary = models.TextField()
    content = models.TextField()
    sentiment = models.FloatField(default=0)

    def __str__(self):
        return self.title
