from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from .serializers import FilesSerializer
from .models import Files


class FileListAPI(generics.ListAPIView):
    queryset = Files.objects.all()
    serializer_class = FilesSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Files.objects.all()
        else:
            return Files.objects.filter(owner_id=user)


class FileUploadAPI(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = FilesSerializer

    def get_queryset(self):
        user = self.request.user
        return Files.objects.filter(owner_id=user)

    def perform_create(self, serializer):
        serializer.save(owner_id=self.request.user)

