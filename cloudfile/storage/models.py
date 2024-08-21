from django.conf import settings
from django.db import models
from django.contrib.auth.models import User
from django.utils.crypto import get_random_string
import os
# Create your models here.


def upload_to(instance, filename):
    # Генерация уникального пути для каждого файла
    _, extension = os.path.splitext(filename)
    random_name = get_random_string(length=32)
    return f'{instance.owner_id.username}/{random_name}{extension}'


class Files(models.Model):
    filename = models.CharField(max_length=255)
    file = models.FileField(upload_to=upload_to)
    comment = models.TextField(blank=True)
    size = models.CharField(editable=False, max_length=100)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    downloaded_at = models.DateTimeField(auto_now=True)
    owner_id = models.ForeignKey(User, related_name="user", on_delete=models.CASCADE, null=True)
    download_link = models.CharField(max_length=255, unique=True, blank=True, editable=False)

    def save(self, *args, **kwargs):
        self.download_link = get_random_string(length=32)
        self.size = self.file.path
        super(Files, self).save(*args, **kwargs)

    def __str__(self):
        return self.filename

