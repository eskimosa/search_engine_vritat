from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import APIView
from backend.models import News


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

