from __future__ import unicode_literals

from django.db import models

import datetime

# Create your models here.
class UserProfile(models.Model):
  name = models.CharField(max_length=100)
  about = models.CharField(max_length=1000)
  background_image = models.CharField(max_length=500)
  user_id = models.CharField(max_length=100)
  password = models.CharField(max_length=100)
  token = models.IntegerField(max_length=10)

class Blog(models.Model):
  BLOG_STATUS = (
      ('Draft', 'Draft'),
      ('Published', 'Published')
  )
  heading = models.CharField(max_length=500)
  sub_heading = models.CharField(max_length=1000)
  content = models.CharField(max_length=2000)
  background_image = models.CharField(max_length=500)
  posted_by = models.CharField(max_length=100)
  posted_on = models.CharField(max_length=50)
  status = models.CharField(max_length=50, choices=BLOG_STATUS)

  def __init__(blog_json_data):
    for key in blog_json_data.keys():
      Blog.__dict__[key] = blog_json_data[key]
    Blog.__dict__['posted_on'] = date.today().strftime('%d %B %y')

