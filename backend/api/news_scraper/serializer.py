from rest_framework import serializers

from backend.models import News

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = ['id', 'category', 'title', 'link', 'published', 'summary', 'content', 'deleted', 'sentiment']

