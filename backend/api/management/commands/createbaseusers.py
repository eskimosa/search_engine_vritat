from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

class Command(BaseCommand):
    help = 'Creates initial users for the application'

    def handle(self, *args, **options):
        if not User.objects.filter(username=DJANGO_SUPERUSER_USERNAME).exists():
            User.objects.create_superuser(DJANGO_SUPERUSER_USERNAME, DJANGO_SUPERUSER_EMAIL, DJANGO_SUPERUSER_PASSWORD)

        if not User.objects.filter(username=USER_1).exists():
            User.objects.create_user(USER_1, USER_1_EMAIL, USER_1_PASSWORD)

        self.stdout.write(self.style.SUCCESS('First initial users created successfully'))

        if not User.objects.filter(username=USER_2).exists():
            User.objects.create_user(USER_2, USER_2_EMAIL, USER_2_PASSWORD)

        self.stdout.write(self.style.SUCCESS('First initial users created successfully'))
