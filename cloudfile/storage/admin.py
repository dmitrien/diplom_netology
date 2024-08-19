from django.contrib import admin
from .models import Files
# Register your models here.

class PanelFiles(admin.ModelAdmin):
    list_display = ('id', 'filename', 'file', 'description', 'uploaded_at')
    list_display_links = ('id', 'filename', 'description')
    search_fields = ('filename', 'uploaded_at',  'description')
    list_filter = ('filename', 'uploaded_at')


admin.site.register(Files, PanelFiles)

