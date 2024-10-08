# Generated by Django 5.1 on 2024-08-20 16:08

import storage.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('storage', '0005_files_owner_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='files',
            old_name='description',
            new_name='comment',
        ),
        migrations.RemoveField(
            model_name='files',
            name='file',
        ),
        migrations.AddField(
            model_name='files',
            name='download_link',
            field=models.CharField(blank=True, max_length=255, unique=True),
        ),
        migrations.AddField(
            model_name='files',
            name='downloaded_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='files',
            name='file_path',
            field=models.FileField(default='nuul', upload_to=storage.models.upload_to),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='files',
            name='size',
            field=models.BigIntegerField(default=23423),
            preserve_default=False,
        ),
    ]
