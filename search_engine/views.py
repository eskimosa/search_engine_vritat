from rest_framework import status
from django.apps import apps
from rest_framework.response import Response
from rest_framework.decorators import APIView
from .rss import extract_news_from_rss
from .serialize_and_validate import serialize_and_validate

urls = apps.get_app_config('search_engine').rss_urls


class NewsAPIView(APIView):
    def get(self, request):
        try:
            rss_urls = urls['urls']
            news_list = extract_news_from_rss(rss_urls)
            serialized_data = serialize_and_validate(news_list)
            return Response(serialized_data)
        except Exception as e:
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


