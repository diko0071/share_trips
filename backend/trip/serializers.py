from rest_framework import serializers
from .models import Trip

class TripDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = '__all__'