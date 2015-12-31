from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse

from apis import Auth
# Create your views here.


class Application:
  auth = Auth()
  def get(self, request):
    auth_token = request.COOKIES.get("auth_token", None)
    context = {}
    if not auth_token:
      template = loader.get_template('login.html')
    else:
      user_obj = auth.get_user(auth_token)
      if not user_obj:
        template = loader.get_template('login.html')
      user_obj = auth.auth_user(auth_token)
      context = {"auth_token": token, "user_obj": user_obj}
    template = loader.get_template('index.html')
    return HttpResponse(template.render(), context)


  def post(self, request):
    request_json = json.loads(request.body)
    user_name = request.get("user_name", None)
    password = request.get("password", None)
    context = {}
    if not user_name and not pwd:
      template = loader.get_template('login.html')
    else:
      auth_token = auth.get_token(user, password)
      if not auth_token:
        context = {"status": "Error", "error_message": "user name or password not exist"}

      else:
        user_obj = auth.auth_user(auth_token)
        context = {"auth_token": auth_token, "user_obj": user_obj}
        template = loader.get_template('index.html')

    return HttpResponse(template.render(), context)

