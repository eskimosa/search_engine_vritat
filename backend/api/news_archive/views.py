from backend.models import News
from rest_framework import viewsets
from ..news.serializer import NewsSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import APIView
from datetime import datetime, timedelta

class ArchivedListViewSet(viewsets.ModelViewSet):
    queryset = News.objects.filter(archived=True)
    serializer_class = NewsSerializer

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)

            return Response(serializer.data)
        except Exception as e:
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ArchiveArticleView(APIView):
    def post(self, request):
        article_id = request.data.get('article_id')
        try:
            article = News.objects.get(pk=article_id)
            article.archived = True
            article.save()
            return Response({'message':'Articled marked as archived successfully'})
        except News.DoesNotExist:
            return Response({'error': 'Article not found'}, status=status.HTTP_404_NOT_FOUND)

class ArchiveNewsAPIView(APIView):
    def post(self, request):
        archive_type = request.data.get('archive_type')
        date_threshold = self.get_date_threshold(archive_type)
        if not date_threshold:
            return Response({"error": "Invalid archive type"}, status=status.HTTP_400_BAD_REQUEST)

        News.objects.filter(published__lt=date_threshold).update(archived=True)
        return Response({"message": f"News archived successfully older than {archive_type}"})

    def get_date_threshold(self, archive_type):
        if archive_type == "1_week":
            return datetime.now() - timedelta(days=7)
        elif archive_type == "3_days":
            return datetime.now() - timedelta(days=3)
        elif archive_type == "1_day":
            return datetime.now() - timedelta(days=1)
        return None