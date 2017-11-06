"""mydiary URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import include, url
from django.contrib import admin
from mailer.views import mailer_submit

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^', include('myoldEP.urls')),
    url(r'^transactions/', include('transactions.urls')),
    url(r'^diary/', include('diary.urls')),
    url(r'^myoldEP/', include('myoldEP.urls')),
    url(r'^modern-ghosts/', include('modernghosts.urls')),
    url(r'^mailer_submit/', mailer_submit, name="mailer_submit"),
    url(r'^developer/', include('developer.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
