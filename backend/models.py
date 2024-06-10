from django.db import models


# Create your models here.
class News(models.Model):
    source = models.URLField()
    category = models.CharField(max_length=250)
    title = models.TextField()
    link = models.URLField()
    published = models.DateField()
    summary = models.TextField()
    content = models.TextField()
    sentiment = models.FloatField(default=0)
    deleted = models.BooleanField(default=False)
    archived = models.BooleanField(default=False)

    def __str__(self):
        return self.title


