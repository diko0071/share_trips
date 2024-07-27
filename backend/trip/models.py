from django.db import models
from useraccount.models import User

class Month(models.TextChoices):
    JANUARY = 'January', 'January'      
    FEBRUARY = 'February', 'February' 
    MARCH = 'March', 'March' 
    APRIL = 'April', 'April'
    MAY = 'May', 'May'
    JUNE = 'June', 'June'
    JULY = 'July', 'July'
    AUGUST = 'August', 'August'
    SEPTEMBER = 'September', 'September'
    OCTOBER = 'October', 'October'
    NOVEMBER = 'November', 'November'
    DECEMBER = 'December', 'December'
    FLEXIBLE = 'Flexible', 'Flexible'

    def __str__(self):
        return self.name

class Status(models.TextChoices):
    ACTIVE = 'Active', 'Active'
    ARCHIVED = 'Archived', 'Archived'
    DRAFT = 'Draft', 'Draft'

class Currency(models.TextChoices):
    USD = 'USD', 'USD'
    EUR = 'EUR', 'EUR'
    GBP = 'GBP', 'GBP'
    RUB = 'RUB', 'RUB'
    KZT = 'KZT', 'KZT'

class Trip(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    image1 = models.ImageField(upload_to='images/', null=True, blank=True)
    image2 = models.ImageField(upload_to='images/', null=True, blank=True)
    image3 = models.ImageField(upload_to='images/', null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    month = models.CharField(max_length=255, choices=Month.choices, null=True, blank=True)
    budget = models.IntegerField(null=True, blank=True)
    currency = models.CharField(max_length=255, choices=Currency.choices, null=True, blank=True)
    url = models.URLField(max_length=200, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=255, choices=Status.choices, default=Status.ACTIVE)

    def __str__(self):
        return self.name
        