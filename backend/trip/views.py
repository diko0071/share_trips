from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from .models import Trip
from .serializers import TripDetailSerializer
from .services import fetch_airbnb_page
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from rest_framework import status
from cacheops import cached_view_as
from .prompts import generate_trip_data_prompt
from .services import openai_call
import json
from pexelsapi.pexels import Pexels
import os

@cached_view_as(Trip, timeout=60*15)
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_trip_list(request):
    trips = Trip.objects.filter(status='Active')
    serializer = TripDetailSerializer(trips, many=True)
    return Response(serializer.data)


@cached_view_as(Trip, timeout=60*15)
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_trip_detail(request, pk):
    trip = Trip.objects.get(id=pk)
    serializer = TripDetailSerializer(trip)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_trip(request):
    serializer = TripDetailSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_trip(request, pk):
    trip = get_object_or_404(Trip, pk=pk, created_by=request.user)
    data = request.data.copy()
    data['created_by'] = request.user.pk
    serializer = TripDetailSerializer(trip, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_trip(request, pk):
    trip = Trip.objects.get(id=pk)
    trip.delete()
    return Response('Trip was deleted')

@cached_view_as(Trip, timeout=60*15)
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_trip_list_by_user(request, pk):
    trips = Trip.objects.filter(created_by__username=pk)
    serializer = TripDetailSerializer(trips, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([AllowAny])
def parse_airbnb_url(request):
    url = request.data.get('url')
    if not url:
        return Response({'error': 'URL is required'}, status=400)
    soup = fetch_airbnb_page(url)
    return Response({'content': str(soup)})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_trip_data(request):
    user = request.user
    prompt = request.data.get('prompt')
    system_prompt = generate_trip_data_prompt
    response = openai_call(prompt, system_prompt, user)
    response_json = json.loads(response)
    return Response(response_json)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def search_pexels_photos(request):
    query = request.GET.get('query')
    pexel = Pexels(os.getenv('PEXELS_API_KEY'))
    search_photos = pexel.search_photos(query=query, orientation='', size='large', color='', locale='', page=1, per_page=20)
    return Response(search_photos)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_pexels_photo(request, photo_id):
    pexel = Pexels(os.getenv('PEXELS_API_KEY'))
    get_photo = pexel.get_photo(photo_id=photo_id)
    return Response(get_photo)