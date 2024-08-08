from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.utils.crypto import get_random_string
from .models import User
from .serializers import UserDetailSerializer, CustomLoginResponseSerializer
from dj_rest_auth.views import UserDetailsView
from rest_framework.permissions import AllowAny
from rest_framework import status
from cacheops import cached_view_as
from datetime import datetime
import base64
import os
from dotenv import load_dotenv
from .services import send_transactional_email
from dj_rest_auth.views import LoginView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework_simplejwt.tokens import RefreshToken
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount.providers.oauth2.client import OAuth2Error

load_dotenv()

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    permission_classes = [AllowAny]
    authentication_classes = []
    callback_url = os.environ.get('FRONTEND_URL')
    client_class = OAuth2Client

    def get_response(self):
        try:
            response = super().get_response()
            user_data = response.data.get('user', {})
            email = user_data.get('email')
            
            user = User.objects.filter(email=email).first()
            if not user:
                return Response({"detail": "You are not registered with us. Please sign up to continue."}, status=status.HTTP_400_BAD_REQUEST)
            
            if not user.is_email_verified:
                user.is_email_verified = True
                user.save()
            refresh = RefreshToken.for_user(user)
            response.data = {
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'is_email_verified': user.is_email_verified
                }
            }
            return response
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
class GoogleRegistration(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    permission_classes = [AllowAny]
    authentication_classes = []
    callback_url = os.environ.get('FRONTEND_URL_REGISTRATION')
    client_class = OAuth2Client

    def get_response(self):
        try:
            response = super().get_response()
            user = self.user
            
            if not user.is_email_verified:
                user.is_email_verified = True
                user.save()
            refresh = RefreshToken.for_user(user)
            response.data = {
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'is_email_verified': user.is_email_verified
                }
            }
            return response
        except OAuth2Error as e:
            return Response({'error': str(e), 'details': e.args}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

class CustomLoginView(LoginView):
    def get_response(self):
        response = super().get_response()
        user_data = {
            'id': self.user.id,
            'username': self.user.username,
            'email': self.user.email,
            'is_email_verified': self.user.is_email_verified
        }
        return Response({
            'access': response.data.get('access'),
            'refresh': response.data.get('refresh'),
            'user': user_data
        })

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
@permission_classes([IsAuthenticated])
def send_otp(request):
    user = request.user
    email = user.email
    
    if user.is_email_verified:
        return Response({"detail": "Email already verified"}, status=status.HTTP_400_BAD_REQUEST)
    
    otp = get_random_string(length=10, allowed_chars='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')
    user.otp = otp
    user.otp_created_at = datetime.now()
    user.save()

    data_variables = {
        "confirmation_url": f"{os.environ.get('FRONTEND_URL')}/email-confirmation?email={email}&token={otp}",
    }
    try:
        email = send_transactional_email(email, data_variables)
    
    except Exception as e:
        return Response({"detail": "An error occurred while sending the OTP"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response({"message": "OTP sent successfully"})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def verify_otp(request):
    user = request.user
    email = request.data.get('email')
    otp = request.data.get('otp')

    if email != user.email:
        return Response({"detail": "Invalid email"}, status=status.HTTP_400_BAD_REQUEST)
    
    if user.is_email_verified:
        return Response({"detail": "Email already verified"}, status=status.HTTP_400_BAD_REQUEST)

    if user.is_otp_expired():
        return Response({'error': 'OTP has expired'}, status=status.HTTP_400_BAD_REQUEST)

    if user.otp == otp:
        user.clear_expired_otp()
        user.is_email_verified = True
        user.save()
        return Response({'message': 'OTP verified successfully'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)




