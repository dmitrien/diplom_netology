from rest_framework import routers
from .api import FilesViewSet


router = routers.DefaultRouter()
router.register('api/files', FilesViewSet, 'files')


urlpatterns = router.urls