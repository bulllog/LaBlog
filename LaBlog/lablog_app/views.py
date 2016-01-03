from django.template.response import TemplateResponse
from django.http import JsonResponse
from django.views.generic import View

from apis import Auth

import json

class Views(View):
  auth = Auth()

  def get(self, request):
    auth_token = request.COOKIES.get("auth_token", None)
    context = {}
    template = 'login.html'
    if auth_token:
      user_obj = self.auth.auth_user(auth_token)
      if user_obj:
        context = {"user_obj": user_obj}
        template = 'index.html'
      else:
        context = {"status": "Error",
                   "error_message": "user name or password not exist"}

    return TemplateResponse(request, template, context).render()

  def post(self, request):
    request_json = json.loads(request.body)
    user_name = request_json.get("user_name", None)
    password = request_json.get("password", None)
    context = {}
    template = 'login.html'

    if user_name and password:
      auth_token = self.auth.get_token(user_name, password)
      if not auth_token:
        context = {"status": "Error",
                   "error_message": "user name or password not exist"}
      else:
        context = {"auth_token": auth_token}

    return JsonResponse(context)
