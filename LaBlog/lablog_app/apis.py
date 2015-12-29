from django.core import serializers
from django.http import JsonResponse
from django.views.generic import View
from django.views.decorators.csrf import csrf_exempt

from models import Blog

import logging

class Blogs(View):

  def get(self, request, *args, **kwargs):
    index = request.GET.get('index', 0)
    posted_by = request.GET.get('posted_by', 'all')

    blogs = None
    if posted_by == 'all':
      blogs = Blog.objects.all()[index:10]
    else:
      blogs = Blog.objects.filter(posted_by__exact=posted_by)
    data = serializers.serialize('json', blogs)
    return JsonResponse(data, safe=False)

  @csrf_exempt
  def post(self, request, *args, **kwargs):
    blog_json =  request.POST.get('data', {})
    blog_obj = Blog(blog_json)
    blog_obj.save()
    response = {"status": "success"}
    return JsonResponse(response)

