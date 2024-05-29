from django.apps import AppConfig

from backend.get_source_urls import get_la_vanguardia_urls, get_elpais_urls


class SearchEngineConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'backend'

    def ready(self):
        self.la_vanguardia_urls = get_la_vanguardia_urls()
        self.elpais_urls = get_elpais_urls()
