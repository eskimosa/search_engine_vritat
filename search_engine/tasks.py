from celery import shared_task
import requests


@shared_task
def schedule_update():
    try:
        # Call the add_news endpoint
        response = requests.get('http://localhost:8000/api/add_news')
        response.raise_for_status()  # Raise an exception for non-200 status codes
        print('Data updated successfully:', response.text)
    except requests.exceptions.RequestException as e:
        print('Error updating data:', e)
