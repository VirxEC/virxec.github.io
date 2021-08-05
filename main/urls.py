from django.contrib.sitemaps.views import sitemap
from django.urls import include, path

from . import sitemap as smaps
from . import views

handler404 = 'main.views.handler404'

sitemaps = {
    'static': smaps.StaticViewSitemap
}

urlpatterns = [
    path("", views.home, name="main_home"),
    path("Options", views.options, name="options"),
    path("VEB", views.virxeb, name="virxeb"),
    path("ERLU", views.virxerlu, name="virxerlu"),
    path("MC-CF", views.minecraft_curseforge, name='minecraft_curseforge'),
    path("rlballsym", views.rlballsym, name="rl_ball_sym"),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}),
    path("robots.txt", views.robots_txt),
    path("ads.txt", views.ads_txt),
    path('', include('pwa.urls'))
]
