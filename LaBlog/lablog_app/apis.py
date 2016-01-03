from django.core import serializers
from django.http import JsonResponse
from django.views.generic import View
from django.views.decorators.csrf import csrf_exempt

from models import Blog
from models import UserProfile

from datetime import date
import logging
import json
import uuid


class Blogs(View):

  def get(self, request, *args, **kwargs):
    posted_by = request.GET.get('posted_by', 'all')

    blogs = None
    data = None
    if posted_by == 'all':
      blogs = Blog.objects.filter(status__exact="Published")
    else:
      blogs = Blog.objects.filter(posted_by__exact=posted_by)

    data = serializers.serialize('json', blogs)
    return JsonResponse(data, safe=False)

  def put(self, request, *args, **kwargs):
    request_obj = json.loads(request.body)
    blog_id = request_obj.get("blog_id")
    status = request_obj.get("status")
    blogs = Blog.objects.filter(blog_id=blog_id)

    if blogs:
      for blog in blogs:
        blog.status = status
        blog.save()
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
    response = {"status": "Success"}
    return JsonResponse(response)

  def create_blog(self, blog_json_data):
    heading = blog_json_data['heading']
    sub_heading = blog_json_data['sub_heading']
    content = blog_json_data['content']
    posted_by = blog_json_data['posted_by']
    status = blog_json_data['status']
    posted_on = String(date.today().strftime('%d %B %y'))
    return Blog(heading=heading, sub_heading=sub_heading, content=content,
                posted_by=posted_by, status=status, posted_on=posted_on)


class User(View):
  def post(self, request, *args, **kwargs):
    user_json = json.loads(request.body)
    user_obj = self.create_user(user_json)
    user_obj.save()
    response = {"status": "Success"}
    return JsonResponse(response)

  def create_user(self, user_data):
    name = user_data['name']
    about = user_data['about']
    background_image = user_data['background_image']
    password = user_data['password']
    user_name = user_data['user_name']
    return UserProfile(
        name=name, about=about, user_name=user_name,
        background_image=background_image, password=password)


class Auth:
  def get_token(self, user_name, password):
    users = UserProfile.objects.filter(
        user_name__exact=user_name,
        password__exact=password)

    if users:
      token = None
      for user in users:
        token = genrate_id()
        user.token = token
        user.save()
      return token
    return False

  def auth_user(self, token):
    users = UserProfile.objects.filter(token__exact=token)
    if users:
      serialized_users = serializers.serialize('json', users)
      users_json = json.loads(serialized_users)
      user = users_json[0]
      user['fields'].pop("password", None)
      return json.dumps(user)


def genrate_id():
  return uuid.uuid4()
