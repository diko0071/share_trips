from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.utils.crypto import get_random_string
from .models import User
from .serializers import UserDetailSerializer
from dj_rest_auth.views import UserDetailsView
from rest_framework.permissions import AllowAny
from rest_framework import status
from cacheops import cached_view_as
from datetime import datetime
import base64
import os
from dotenv import load_dotenv
from .services import send_transactional_email

load_dotenv()

class CustomUserDetailsView(UserDetailsView):
    serializer_class = UserDetailSerializer

    def update(self, request, *args, **kwargs):
        try:
            response = super().update(request, *args, **kwargs)
            return response
        except Exception as e:
            print(e)
            return Response({"detail": f"An error occurred while updating user details: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@cached_view_as(User, timeout=60*15)
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_profile(request, username):
    user = get_object_or_404(User, username=username)
    serializer = UserDetailSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def send_otp(request):
    email = request.data.get('email')
    token = request.data.get('token')
    print(f"Received request with email: {email} and token: {token}")

    if not email or not token:
        return Response({"detail": "Email and token are required", "success": False}, status=status.HTTP_400_BAD_REQUEST)

    try:
        data_variables = {
            "one-time-code": token,
        }
        send_transactional_email(email, data_variables)
        
        return Response({
            "message": "OTP sent successfully", 
            "success": True
        })
    except Exception as e:
        print(f"Error processing OTP: {str(e)}")
        return Response({"detail": f"An error occurred while processing the OTP: {str(e)}", "success": False}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



