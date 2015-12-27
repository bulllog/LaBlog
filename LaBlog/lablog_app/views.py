from django.core import serializers
from django.http import HttpResponse
from django.views.generic import View


class Blogs(View):

  def get(self, request, *args, **kwargs):
    index = request.GET.get('index', 0)
    posted_by = request.GET.get('posted_by', 'all')

    posts = None
    if posted_by == 'all':
      posts = Post.objects.all()[index:10]
    else:
      posts = Post.objects.filter(posted_by__exact=posted_by)
    data = serializers.serialize('json', posts)
    return HttpResponse(data, content_type='application/json')

  def post(self, request, *args, **kwargs):
    post_json =  request.POST.get('data', {})
    post_obj = Post()
    post_obj.save()
