from django.contrib.sitemaps.views import sitemap
from django.urls import include, path
from django.views.generic.base import TemplateView

from . import sitemap as smaps
from . import views

handler404 = 'main.views.handler404'

sitemaps = {
    'static': smaps.StaticViewSitemap
}

urlpatterns = [
    path("", views.home, name="main_home"),
    path("CP-P", views.calcplus_preview, name="calcplus_preview"),
    path("CP-S", views.calcplus_source, name="calcplus_source"),
    path("Options", views.options, name="options"),
    path("VEB", views.virxeb, name="virxeb"),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}),
    path("robots.txt", views.robots_txt),
    path('', include('pwa.urls'))
]
