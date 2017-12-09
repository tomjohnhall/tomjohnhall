from django.conf.urls import url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from . import views

app_name = 'developer'
urlpatterns = [
    url(r'^$', views.developer_index, name="developer_index"),
    url(r'^detail/(?P<project_id>[0-9]+)/$', views.project, name='project'),
    url(r'^addProject/$', views.addProject, name='addProject'),
    url(r'^login/$', views.user_login, name="user_login"),
    ]

urlpatterns += staticfiles_urlpatterns()
