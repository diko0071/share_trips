from django.urls import path
from .views import *

urlpatterns = [
    path('trip/', get_trip_list, name='trip_list'),
    path('trip/<int:pk>/', get_trip_detail, name='trip_detail'),
    path('trip/create/', create_trip, name='trip_create'),
    path('trip/<int:pk>/update/', update_trip, name='trip_update'),
    path('trip/<int:pk>/delete/', delete_trip, name='trip_delete'),
]