from django.apps import AppConfig

from search_engine.get_rss_urls import get_rss


class SearchEngineConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'search_engine'

    def ready(self):
        self.rss_urls = get_rss()
