from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import APIView
from backend.models import News

class SchedulePostView(APIView):
    def post(self, request):
        article_id = request.data.get('article_id')
        scheduled_date = request.data.get('scheduled date')