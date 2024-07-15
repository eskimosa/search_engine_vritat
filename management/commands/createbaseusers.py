from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
import os

class Command(BaseCommand):
    help = 'Creates initial users for the application'

    def create_users(self, superuser_username, superuser_email, superuser_password, user1_username, user1_email, user1_password, user2_username, user2_email, user2_password):
        if not User.objects.filter(username=superuser_username).exists():
            User.objects.create_superuser(superuser_username, superuser_email, superuser_password)
            self.stdout.write(self.style.SUCCESS(f'Superuser "{superuser_username}" created successfully'))
        else:
            self.stdout.write(self.style.WARNING(f'Superuser "{superuser_username}" already exists'))

        if not User.objects.filter(username=user1_username).exists():
            User.objects.create_user(user1_username, user1_email, user1_password)
            self.stdout.write(self.style.SUCCESS(f'User "{user1_username}" created successfully'))
        else:
            self.stdout.write(self.style.WARNING(f'User "{user1_username}" already exists'))

        if not User.objects.filter(username=user2_username).exists():
            User.objects.create_user(user2_username, user2_email, user2_password)
            self.stdout.write(self.style.SUCCESS(f'User "{user2_username}" created successfully'))
        else:
            self.stdout.write(self.style.WARNING(f'User "{user2_username}" already exists'))

    def handle(self, *args, **options):
        superuser_username = os.getenv('DJANGO_SUPERUSER_USERNAME')
        superuser_email = os.getenv('DJANGO_SUPERUSER_EMAIL')
        superuser_password = os.getenv('DJANGO_SUPERUSER_PASSWORD')
        user1_username = os.getenv('USER_1_USERNAME')
        user1_email = os.getenv('USER_1_EMAIL')
        user1_password = os.getenv('USER_1_PASSWORD')
        user2_username = os.getenv('USER_2_USERNAME')
        user2_email = os.getenv('USER_2_EMAIL')
        user2_password = os.getenv('USER_2_PASSWORD')

        self.create_users(superuser_username, superuser_email, superuser_password, user1_username, user1_email, user1_password, user2_username, user2_email, user2_password)



