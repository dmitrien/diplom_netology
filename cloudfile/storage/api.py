from rest_framework import generics, permissions, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from .serializers import FilesSerializer


class GetFilesAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = FilesSerializer

    def get_queryset(self):
        return self.request.user.files.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class FileUploadAPI(generics.GenericAPIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        file_serializer = FilesSerializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        raise Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

