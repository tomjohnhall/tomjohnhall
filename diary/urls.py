from django.conf.urls import url

from . import views

app_name = 'diary'
urlpatterns = [

url(r'^$', views.index, name="index"),
url(r'^user_login/$', views.user_login, name="user_login"),
url(r'^logout/$', views.logout, name="logout"),
url(r'^entry/$', views.entry, name='entry'),
url(r'^submitted/$', views.submitted),
url(r'^secrets/$', views.secrets),
url(r'^secret_submit/$', views.secret_submit, name='secret_submit'),
url(r'^realentries/(?P<pk>[0-9]+)/$', views.EntryView.as_view(), name='detail'),
url(r'^entries/(?P<pk>[0-9]+)/$', views.MilliganView.as_view(), name='millidetail'),

]
