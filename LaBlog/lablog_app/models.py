from __future__ import unicode_literals

from django.db import models

# Create your models here.
class UserProfile(models.Model):
  name = models.CharField(max_length=100)
  about = models.CharField(max_length=1000)
  background_image = models.CharField(max_length=500)
  user_id = models.CharField(max_length=100)
  password = models.CharField(max_length=100)


class Post(models.Model):
  POST_STATUS = (
      ('Draft', 'Draft'),
      ('Published', 'Published')
  )
  heading = models.CharField(max_length=500)
  sub_heading = models.CharField(max_length=1000)
  content = models.CharField(max_length=2000)
  background_image = models.CharField(max_length=500)
  posted_by = models.CharField(max_length=100)
  posted_on = models.CharField(max_length=50)
  status = models.CharField(max_length=50, choices=POST_STATUS)
