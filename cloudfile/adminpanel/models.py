from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Files(models.Model):
    user_id = models.ForeignKey(User, related_name='files', on_delete=models.CASCADE)
    filename = models.CharField(max_length=100)
    file_path = models.CharField(max_length=250)
    upload_date = models.DateTimeField(auto_now_add=True)
    size = models.IntegerField()
    file_type = models.CharField(max_length=10)

    def __str__(self):
        return self.filename + self.file_type

