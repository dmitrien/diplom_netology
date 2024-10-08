# Generated by Django 5.1 on 2024-08-18 10:37

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Files',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('filename', models.CharField(max_length=100)),
                ('file_path', models.CharField(max_length=250)),
                ('upload_date', models.DateTimeField(auto_now_add=True)),
                ('size', models.IntegerField(max_length=12)),
                ('file_type', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=10)),
                ('surname', models.CharField(blank=True, max_length=20)),
                ('email', models.EmailField(max_length=254)),
                ('password_hash', models.CharField(max_length=250)),
                ('registration_date', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='FileVersion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('version', models.IntegerField(max_length=10)),
                ('file_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='storage.files')),
            ],
        ),
        migrations.AddField(
            model_name='files',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='storage.users'),
        ),
        migrations.CreateModel(
            name='AccessControl',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('access_level', models.BooleanField(default=True)),
                ('file_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='storage.files')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='storage.users')),
            ],
        ),
    ]
