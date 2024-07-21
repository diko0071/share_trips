from rest_framework import serializers
from .models import Trip

class TripDetailSerializer(serializers.ModelSerializer):
    created_by_name = serializers.SerializerMethodField()
    user_coliver_preferences = serializers.SerializerMethodField()
    photo = serializers.SerializerMethodField()

    class Meta:
        model = Trip
        fields = '__all__'
        extra_fields = ['created_by_name', 'user_coliver_preferences', 'photo']

    def get_created_by_name(self, obj):
        return obj.created_by.name

    def get_user_coliver_preferences(self, obj):
        return obj.created_by.coliver_preferences  

    def get_photo(self, obj):
        return obj.created_by.photo.url

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['created_by_name'] = self.get_created_by_name(instance)
        ret['user_coliver_preferences'] = self.get_user_coliver_preferences(instance)
        ret['photo'] = self.get_photo(instance)
        return ret