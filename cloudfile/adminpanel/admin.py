from django.contrib import admin
from .models import  Files
# Register your models here.

class PanelFiles(admin.ModelAdmin):
    list_display = ('id', 'user_id', 'filename', 'file_path', 'upload_date', 'file_type')
    list_display_links = ('id', 'user_id')
    search_fields = ('filename', 'user_id')
    list_filter = ('user_id', 'filename', 'file_type', 'upload_date')


admin.site.register(Files, PanelFiles)

