from rest_framework import status
from django.apps import apps
from rest_framework.response import Response
from rest_framework.decorators import APIView, api_view
from .rss import extract_news_from_rss
from .serialize_and_validate import serialize_and_validate
from .models import News
from rest_framework import viewsets
from .serializer import NewsSerializer

urls = apps.get_app_config('search_engine').rss_urls


class NewsParserAPIView(APIView):
    def get(self, request):
        try:
            rss_urls = urls['urls']
            news_list = extract_news_from_rss(rss_urls)

            serialized_data = serialize_and_validate(news_list)
            return Response(serialized_data)
        except Exception as e:
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class NewsListViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializer

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)

            return Response(serializer.data)
        except Exception as e:
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class MarkAsDeleted(APIView):
    def post(self, request):
        article_id = request.data.get('article_id')
        try:
            article = News.objects.get(pk=article_id)
            article.deleted = True
            article.save()
            return Response({'message': 'Article marked as deleted successfully'})
        except News.DoesNotExist:
            return Response({'error': 'Article not found'}, status=status.HTTP_404_NOT_FOUND)

'''class UpdateFrequency(APIView):
    def post(self, request, format=None):
        frequency = request.data.get('frequency')
        if not frequency:
            return Response({'error': 'Frequency not provided'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'frequency': frequency}, status=status.HTTP_201_CREATED)'''

