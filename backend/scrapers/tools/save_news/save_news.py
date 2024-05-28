from backend.scrapers.serializer import NewsSerializer
from rest_framework.response import Response
from rest_framework import status

class SaveNews:
    def save_news(self, news):
        serializer = NewsSerializer(data=news, many=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)