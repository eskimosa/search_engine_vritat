# Generated by Django 4.2.6 on 2024-06-11 11:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_news_archived'),
    ]

    operations = [
        migrations.AlterField(
            model_name='news',
            name='source',
            field=models.CharField(max_length=250),
        ),
    ]