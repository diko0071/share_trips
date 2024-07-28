from rest_framework import serializers
from .models import Trip

class TripDetailSerializer(serializers.ModelSerializer):
    created_by_name = serializers.SerializerMethodField()
    user_coliver_preferences = serializers.SerializerMethodField()
    photo = serializers.SerializerMethodField()

    class Meta:
        model = Trip
        fields = '__all__'
        extra_fields = ['created_by_name', 'user_coliver_preferences', 'photo', 'created_by_username', 'created_by_user_id']

    def get_created_by_name(self, obj):
        if obj.created_by.name:
            return obj.created_by.name
        else:
            return None
        
    def get_user_coliver_preferences(self, obj):
        if obj.created_by.coliver_preferences:
            return obj.created_by.coliver_preferences
        else:
            return None

    def get_photo(self, obj):
        if obj.created_by.photo:
            return obj.created_by.photo.url
        else:
            return None
    
    def get_username(self, obj):
        if obj.created_by.username:
            return obj.created_by.username
        else:
            return None
    
    def get_user_id(self, obj):
        if obj.created_by.id:
            return obj.created_by.id
        else:
            return None

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['created_by_name'] = self.get_created_by_name(instance)
        ret['user_coliver_preferences'] = self.get_user_coliver_preferences(instance)
        ret['photo'] = self.get_photo(instance)
        ret['created_by_username'] = self.get_username(instance)
        ret['created_by_user_id'] = self.get_user_id(instance)
        return ret