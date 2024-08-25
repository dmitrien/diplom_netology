from rest_framework import routers
from .api import FileListAPI, FileUploadAPI, FileSharedLinkAPI, FileDownloadAPI

router = routers.DefaultRouter()
# router.register('api/files', FileListAPI, basename='All_files')
router.register('api/shared', FileSharedLinkAPI, basename='link')
router.register('api/file', FileUploadAPI, basename='file')
router.register('api/file/download', FileDownloadAPI, basename='download')
urlpatterns = router.urls
