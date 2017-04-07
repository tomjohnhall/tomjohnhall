from django.conf.urls import url

from . import views

app_name = 'myoldEP'
urlpatterns = [
    url(r'^$', views.index, name="index"),
    url(r'^scifi/$', views.loadSciFi, name="loadSciFi"),
]
