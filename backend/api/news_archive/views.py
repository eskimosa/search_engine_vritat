from backend.models import News
from rest_framework import viewsets
from ..news.serializer import NewsSerializer
from rest_framework.response import Response
from rest_framework import status

class ArchiveListViewSer(viewsets.ModelViewSet):
    queryset = News.objects.filter(archived=True)
    serializer_class = NewsSerializer

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)

            return Response(serializer.data)
        except Exception as e:
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)