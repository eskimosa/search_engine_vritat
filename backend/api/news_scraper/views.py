from rest_framework import status
from django.apps import apps
from rest_framework.response import Response
from rest_framework.decorators import APIView
from backend.scrapers.la_vanguardia.lavanguardia import LaVanguardiaPlugin

lavanguardia_urls = apps.get_app_config('backend').la_vanguardia_urls


class NewsParserAPIView(APIView):
    def get(self, request):
        try:
            source_urls = lavanguardia_urls['urls']
            lavanguardia_plugin = LaVanguardiaPlugin(urls=source_urls, threshold=0.25)
            news = lavanguardia_plugin.execute()
            return news
        except Exception as e:
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

