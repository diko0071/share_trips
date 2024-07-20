from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import User
from .serializers import UserDetailSerializer
from dj_rest_auth.views import UserDetailsView
from rest_framework.permissions import AllowAny
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

class CustomUserDetailsView(UserDetailsView):
    serializer_class = UserDetailSerializer

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_profile(request):
    user = User.objects.get(id=request.user.id)
    serializer = UserDetailSerializer(instance=user, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_profile(request):
    user = User.objects.get(id=request.user.id)
    serializer = UserDetailSerializer(user)
    return Response(serializer.data)