from rest_framework import serializers
from dj_rest_auth.serializers import LoginSerializer
from .models import User

class CustomLoginSerializer(LoginSerializer):
    pass

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('name', 'photo', 'id', 'about', 'coliver_preferences', 'language', 'social_media_links', 'travel_status', 'username')

class CustomLoginResponseSerializer(serializers.Serializer):
    access = serializers.CharField()
    refresh = serializers.CharField()
    user = UserDetailSerializer()