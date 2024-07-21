from rest_framework import serializers
from .models import User

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('name', 'photo', 'id', 'about', 'coliver_preferences', 'language', 'social_media_links', 'travel_status')