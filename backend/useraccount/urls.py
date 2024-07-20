from django.urls import path
from dj_rest_auth.jwt_auth import get_refresh_view
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView
from rest_framework_simplejwt.views import TokenVerifyView
from .views import CustomUserDetailsView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='rest_register'),
    path('login/', LoginView.as_view(), name='rest_login'),
    path('logout/', LogoutView.as_view(), name='rest_logout'),
    path('token/refresh/', get_refresh_view().as_view(), name='token_refresh'),
    path('user/', UserDetailsView.as_view(), name='rest_user_details'),
    path('user/data/', CustomUserDetailsView.as_view(), name='user_data'),
    path('user/data/update/', CustomUserDetailsView.as_view(), name='user_update'),
]