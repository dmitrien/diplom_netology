from rest_framework import viewsets, permissions
from .serializers import FilesSerializer


class FilesViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = FilesSerializer

    def get_queryset(self):
        return self.request.user.files.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)




