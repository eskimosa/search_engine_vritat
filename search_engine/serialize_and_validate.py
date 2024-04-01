from rest_framework import status
from .serializer import NewsSerializer
from rest_framework.response import Response


def serialize_and_validate(data):
    serializer = NewsSerializer(data=data, many=True)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return serializer.data
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
