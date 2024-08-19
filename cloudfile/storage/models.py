from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Files(models.Model):
    filename = models.CharField(max_length=255)
    file = models.FileField(upload_to='files/')
    description = models.TextField(blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.filename

