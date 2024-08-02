from django.urls import path
from dj_rest_auth.jwt_auth import get_refresh_view
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenVerifyView
from .views import *
from django.conf.urls import include

urlpatterns = [
    path('accounts/', include('allauth.urls')),
    path('register/', RegisterView.as_view(), name='rest_register'),
    path('login/', LoginView.as_view(), name='rest_login'),
    path('logout/', LogoutView.as_view(), name='rest_logout'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), 
    path('token/refresh/', get_refresh_view().as_view(), name='token_refresh'),
    path('user/', UserDetailsView.as_view(), name='rest_user_details'),
    path('user/data/', CustomUserDetailsView.as_view(), name='user_data'),
    path('user/data/update/', CustomUserDetailsView.as_view(), name='user_update'),
    path('user/data/get/<str:username>/', get_profile, name='get_profile'),
    path('user/otp/send/', send_otp, name='send_otp'),
]
