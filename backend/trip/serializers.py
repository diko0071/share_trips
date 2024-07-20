from rest_framework import serializers
from .models import Trip

class TripDetailSerializer(serializers.ModelSerializer):
    created_by_name = serializers.SerializerMethodField()

    class Meta:
        model = Trip
        fields = '__all__'
        extra_fields = ['created_by_name']

    def get_created_by_name(self, obj):
        return obj.created_by.name

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['created_by_name'] = self.get_created_by_name(instance)
        return ret