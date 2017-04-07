from django.conf.urls import url

from . import views

app_name = 'transactions'
urlpatterns = [
    url(r'^$', views.thing, name="thing"),
    url(r'^login/$', views.user_login, name="user_login"),
    url(r'^logout/$', views.user_logout, name='user_logout'),
    url(r'^new/$', views.new_transaction, name='new_transaction'),
    url(r'^latest/$', views.latest_transaction, name='latest_transaction'),
    url(r'^detail/(?P<transaction_id>[0-9]+)/$', views.transaction_detail, name='transaction_detail'),
    url(r'^change/$', views.change, name="change"),
    url(r'^guilt/$', views.guiltfeed, name="guiltfeed"),
    url(r'^soup/$', views.soup, name="soup"),
]
