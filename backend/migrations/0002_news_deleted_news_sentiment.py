# Generated by Django 4.2.6 on 2024-05-17 11:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='news',
            name='deleted',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='news',
            name='sentiment',
            field=models.FloatField(default=0),
        ),
    ]