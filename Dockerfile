FROM python:latest

ENV PYTHONUNBUFFERED=1
# Install PostgreSQL client
RUN apt-get update && \
    apt-get install -y postgresql-client

# Set the working directory in the container
WORKDIR /vritat

COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY . .

# Expose port if needed
EXPOSE 8000

# Command to run the application
CMD ["python3", "manage.py", "runserver"]