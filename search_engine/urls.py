from django.urls import path
from .views import NewsParserAPIView, NewsListViewSet

urlpatterns = [
    path('list_news/', NewsListViewSet.as_view({'get': 'list'}), name='list_news_api'),
    path('add_news/', NewsParserAPIView.as_view(), name='add_news_api')
]
