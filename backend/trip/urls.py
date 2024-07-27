from django.urls import path
from .views import *

urlpatterns = [
    path('trip/', get_trip_list, name='trip_list'),
    path('trip/<int:pk>/', get_trip_detail, name='trip_detail'),
    path('trip/create/', create_trip, name='trip_create'),
    path('trip/<int:pk>/update/', update_trip, name='trip_update'),
    path('trip/<int:pk>/delete/', delete_trip, name='trip_delete'),
    path('trip/parse/', parse_airbnb_url, name='parse_airbnb_url'),
    path('trip/user/<str:pk>/', get_trip_list_by_user, name='trip_list_by_user'),
    path('trip/generate/', generate_trip_data, name='generate_trip_description'),
]