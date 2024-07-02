from backend.models import News
from rest_framework import viewsets
from .serializer import NewsSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import APIView
import logging

logger = logging.getLogger(__name__)

class NewsListViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializer

    def list(self, request, *args, **kwargs):
        logger.info("Received request to list news items")
        logger.debug(f"Request details: {request}")

        try:
            queryset = self.get_queryset()
            logger.debug(f"Queryset retrieved: {queryset}")
            serializer = self.get_serializer(queryset, many=True)
            logger.debug("Serialization successful")

            return Response(serializer.data)
        except Exception as e:
            logger.error("An error occurred while listing news items", exc_info=True)
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
