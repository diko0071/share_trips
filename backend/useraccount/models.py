from django.db import models
from django.contrib.auth.models import User
import requests
import uuid 
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager


class CustomUserManager(UserManager):
    def _create_user(self, email, name, password, **extra_fields):
        if not email:
            raise ValueError('You have not provided a valid email address')
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)
        user.save(using=self.db)
        
        return user
    
    def create_user(self, name=None, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, name, password, **extra_fields)
    
    def create_superuser(self, name=None, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(email, name, password, **extra_fields)   

class Language(models.TextChoices):
    ENGLISH = 'en', 'English'
    SPANISH = 'es', 'Spanish'
    FRENCH = 'fr', 'French'
    GERMAN = 'de', 'German'
    ITALIAN = 'it', 'Italian'
    JAPANESE = 'ja', 'Japanese'
    CHINESE = 'zh', 'Chinese'
    RUSSIAN = 'ru', 'Russian'
    KOREAN = 'ko', 'Korean'

class TravelStatus(models.TextChoices):
    READY_TO_TRAVEL = 'ready_to_travel', 'Ready to travel'
    NOT_READY_TO_TRAVEL = 'not_ready_to_travel', 'Not ready to travel'
    WILL_BE_SOON = 'will_be_soon', 'Will be soon'

class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    photo = models.ImageField(upload_to='images/', null=True, blank=True)
    about = models.TextField(null=True, blank=True)
    coliver_preferences = models.TextField(null=True, blank=True)
    language = models.CharField(max_length=255, choices=Language.choices, null=True, blank=True)
    social_media_links = models.JSONField(null=True, blank=True)
    travel_status = models.CharField(max_length=255, choices=TravelStatus.choices, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    date_joined = models.DateTimeField(auto_now=True)
    last_login = models.DateTimeField(blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FILED = 'email'
    REQUIRED_FIELDS = ['name',]