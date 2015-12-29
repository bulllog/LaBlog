from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static
from lablog_app import views
from lablog_app import apis

urlpatterns = [
    url(r'^blog', apis.Blogs.as_view(), name='Blogs'),
    #url(r'^.*$', views.index, name='index'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

