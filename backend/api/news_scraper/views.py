from rest_framework import status
from django.apps import apps
from rest_framework.response import Response
from rest_framework.decorators import APIView
from backend.scrapers.la_vanguardia.lavanguardia import LaVanguardiaPlugin
from backend.api.news_scraper.serializer import NewsSerializer

lavanguardia_urls = apps.get_app_config('backend').la_vanguardia_urls


class NewsParserAPIView(APIView):
    def get(self, request):
        try:
            source_urls = lavanguardia_urls['urls']
            lavanguardia_plugin = LaVanguardiaPlugin(urls=source_urls)
            news = lavanguardia_plugin.execute()

            serializer = NewsSerializer(data=news, many=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

