from rest_framework import status
from django.apps import apps
from rest_framework.response import Response
from rest_framework.decorators import APIView
from backend.scrapers.la_vanguardia.lavanguardia import LaVanguardiaPlugin
from backend.scrapers.elpais.elpais import ElPaisPlugin
from backend.scrapers.abc.abc import AbcPlugin
from backend.scrapers.el_periodico.el_periodico import PeriodicoPlugin

lavanguardia_urls = apps.get_app_config('backend').la_vanguardia_urls['urls']
elpais_urls = apps.get_app_config('backend').elpais_urls['urls']
abc_urls = apps.get_app_config('backend').abc_urls['urls']
el_periodico_urls = apps.get_app_config('backend').el_periodico_urls['urls']


class NewsParserAPIView(APIView):
    def get(self, request):
        try:
            lavanguardia_plugin = LaVanguardiaPlugin(urls=lavanguardia_urls, threshold=0.3)
            lavanguardia_news, status_code = lavanguardia_plugin.execute()

            elpais_plugin = ElPaisPlugin(urls=elpais_urls, threshold=0.3)
            elpais_news, status_code = elpais_plugin.execute()

            abc_plugin = AbcPlugin(urls=abc_urls, threshold=0.3)
            abc_news, status_code = abc_plugin.execute()

            el_periodico_plugin = PeriodicoPlugin(urls=el_periodico_urls, threshold=0.3)
            el_periodico_news, status_code = el_periodico_plugin.execute()

            all_news = lavanguardia_news + elpais_news + abc_news + el_periodico_news
            return Response(all_news, status=status_code)
        except Exception as e:
            return Response(str(e), status=status_code)

