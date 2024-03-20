FROM python:latest

ENV PYTHONUNBUFFERED=1
# Set the working directory in the container
WORKDIR /vritat

COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY . .

# Expose port if needed
EXPOSE 8000

# Command to run the application
CMD ["python3", "manage.py", "runserver"]