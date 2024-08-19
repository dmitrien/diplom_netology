from django.urls import path
from .api import GetFilesAPI, FileUploadAPI

urlpatterns = [
    path('api/files', GetFilesAPI.as_view()),
    path('api/files/upload', FileUploadAPI.as_view()),
]

