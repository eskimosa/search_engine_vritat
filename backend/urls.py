from django.urls import path, include
from backend.api.news_scraper.views import NewsParserAPIView
from backend.api.news.views import NewsListViewSet, MarkAsDeleted, MarkAsArchived


urlpatterns = [
    path('list_news/', NewsListViewSet.as_view({'get': 'list'}), name='list_news_api'),
    path('add_news/', NewsParserAPIView.as_view(), name='add_news_api'),
    path('delete_news/', MarkAsDeleted.as_view(), name='delete_news_api'),
    path('archived_news/', MarkAsArchived.as_view(), name='archive_news_api'),
    path('auth/', include('backend.api.authentication.urls')),
]
