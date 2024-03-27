from rest_framework import serializers

from .models import News


class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = ['category', 'title', 'link', 'published', 'summary', 'content', 'sentiment']


