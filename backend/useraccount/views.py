from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import User
from .serializers import UserDetailSerializer
from dj_rest_auth.views import UserDetailsView

class CustomUserDetailsView(UserDetailsView):
    serializer_class = UserDetailSerializer

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)