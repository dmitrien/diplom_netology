from django.conf import settings
from django.db import models
from django.contrib.auth.models import User
from django.utils.crypto import get_random_string
import os
# Create your models here.


def upload_to(filename):
    all_files_and_dirs = os.listdir('files/')
    if filename in all_files_and_dirs:
        name, extension = os.path.splitext(filename)
        index = 1
        while True:
            filename = f'{name}{index}{extension}'
            if filename not in all_files_and_dirs:
                break
            index += 1
    return f'files/{filename}'

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
        self.size = self.file.size
        super(Files, self).save(*args, **kwargs)

    def __str__(self):
        return self.filename

