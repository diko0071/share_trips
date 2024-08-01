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
import requests
import os
from dotenv import load_dotenv
from trip.services import send_transactional_email

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
@permission_classes([AllowAny])
@authentication_classes([])
def send_otp(request):
    email = request.data.get('email')
    
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
    # {change 1}
    if user.is_active:
        return Response({"detail": "User is already active"}, status=status.HTTP_400_BAD_REQUEST)
    
    otp = get_random_string(length=6, allowed_chars='0123456789')
    user.otp = otp
    user.otp_created_at = datetime.now()
    user.save()

    data_variables = {
        "one-time-code": otp,
    }
    try:
        transactional_id = str(os.getenv('OTP_TRANSACTION_ID'))
        email = send_transactional_email(transactional_id, email, data_variables)

        print(email)
    
    except Exception as e:
        print(e)
        return Response({"detail": "An error occurred while sending the OTP"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response({"message": "OTP sent successfully"})

@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([])
def verify_otp(request):
    email = request.data.get('email')

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
    otp = request.data.get('otp')

    if user.is_otp_expired():
        return Response({'error': 'OTP has expired'}, status=status.HTTP_400_BAD_REQUEST)

    if user.otp == otp:
        user.clear_expired_otp()
        user.is_active = True
        user.save()
        return Response({'message': 'OTP verified successfully'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)
