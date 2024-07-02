from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializer import UserSerializer
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
import logging

logger = logging.getLogger(__name__)

class SignupView(APIView):
    def post(self, request):
        logger.info("Received signup request")
        logger.debug(f"Request data: {request.data}")

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            logger.debug(f"User created: {user}")

            refresh = RefreshToken.for_user(user)
            logger.info("Signup successful")
            return Response({"refresh": str(refresh), "access": str(refresh.access_token), "user": serializer.data})
        else:
            logger.warning("Signup failed: invalid data")
            logger.debug(f"Errors: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        logger.info("Received login request")
        logger.debug(f"Request data: {request.data}")

        user = get_object_or_404(User, username=request.data['username'])
        logger.debug(f"User found: {user}")

        if not user.check_password(request.data['password']):
            logger.warning("Login failed: invalid credentials")
            return Response({"detail": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)
        refresh = RefreshToken.for_user(user)
        logger.info("Login successful")
        return Response({"refresh": str(refresh), "access": str(refresh.access_token)})

class LogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data['refresh']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
