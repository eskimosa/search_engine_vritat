from django.shortcuts import render
from .models import News
from .serializer import NewsSerializer
from rest_framework.response import Response
from rest_framework.decorators import APIView
from .rss import extract_news_from_rss
import json


# Create your views here.
class NewsAPIView(APIView):
    def get(self, request):
        with open('search_engine/source_urls.json', 'r') as file:
            urls_data = file.read()
        urls = json.loads(urls_data)
        rss_urls = urls['urls']

        news_list = extract_news_from_rss(rss_urls)

        serializer = NewsSerializer(data=news_list, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

