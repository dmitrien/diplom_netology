from rest_framework import routers
from .api import FileListAPI, FileUploadAPI

router = routers.DefaultRouter()
# router.register('api/files', FileListAPI, 'files')
router.register('api/file', FileUploadAPI, 'file')
urlpatterns = router.urls
