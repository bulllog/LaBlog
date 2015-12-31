from django.core import serializers
from django.http import JsonResponse
from django.views.generic import View
from django.views.decorators.csrf import csrf_exempt

from models import Blog

from datetime import date
import logging
import json
import uuid


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

  def put(self, request, *args, **kwargs):
    request_obj = json.loads(request.body)
    blog_id = request_obj.get("blog_id")
    status = request_obj.get("status")
    blog_obj = Blog.objects.filter(blog_id=blog_id)
    if blog_obj:
      blog_obj.status = status
      blog_obj.save()
      return JsonResponse({"status": "Success"})
    else:
      return JsonResponse({
        "status": "Error",
        "error_message": "Blog not exist"
        })

  def post(self, request, *args, **kwargs):
    blog_json =  json.loads(request.body).get("data", {});
    blog_obj = self.create_blog(blog_json)
    blog_obj.save()
    response = {"status": blog_json}
    return JsonResponse(response)

  def create_blog(self, blog_json_data):
    heading = blog_json_data['heading']
    sub_heading = blog_json_data['sub_heading']
    content = blog_json_data['content']
    posted_by = blog_json_data['posted_by']
    status = blog_json_data['status']
    posted_on = date.today().strftime('%d %B %y')
    blog_id = genrate_id()
    return Blog(heading=heading, sub_heading=sub_heading, content=content,
                posted_by=posted_by, status=status, posted_on=posted_on)


class User:
  def post(self, request, *args, **kwargs):
    user_json = json.loads(request.body)
    user_obj = self.create_user(user_json)
    user_obj.save()
    response = {"status": "success"}
    return JsonResponse(response)

  def create_user(self, user_data):
    name = user_data['user_name']
    about = user_data['about']
    background_image = user_data['background_image']
    password = user_data['password']
    return User(name=name, about=about, background_image=background_image, password=password)


class Auth:
  def get_token(self, user_name, password):
    user = User.objects.filter(user_name=user_name).filter(password=password)
    if user:
      token = genrate_id()
      user.token = token
      return token
    else:
      return False

  def auth_user(token):
    user = User.objects.filter(user_name=user_name).filter(token=token)
    if user:
      user_obj = serializers.serialize('json', blogs)
      user_obj.pop("password")
      return user_obj

     


def genrate_id():
  return uuid.uuid4()

