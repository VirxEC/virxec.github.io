from django.contrib.sitemaps import Sitemap
from django.shortcuts import reverse


class StaticViewSitemap(Sitemap):
    def items(self):
        return [
            'main_home',
            'calcplus_preview',
            'calcplus_source',
            'virxeb',
            'minecraft_curseforge',
            'virxerlu'
        ]

    def location(self, item):
        return reverse(item)
