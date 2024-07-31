from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import User
from .serializers import UserDetailSerializer
from dj_rest_auth.views import UserDetailsView
from rest_framework.permissions import AllowAny
from rest_framework import status
from cacheops import cached_view_as
import requests
import os


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
def send_onetime_code_email(request):
    ...