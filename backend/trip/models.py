from django.db import models
from useraccount.models import User

class Month(models.TextChoices):
    JANUARY = 'january', 'January'
    FEBRUARY = 'february', 'February'
    MARCH = 'march', 'March'
    APRIL = 'april', 'April'
    MAY = 'may', 'May'
    JUNE = 'june', 'June'
    JULY = 'july', 'July'
    AUGUST = 'august', 'August'
    SEPTEMBER = 'september', 'September'
    OCTOBER = 'october', 'October'
    NOVEMBER = 'november', 'November'
    DECEMBER = 'december', 'December'

    def __str__(self):
        return self.name

class Trip(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    image1 = models.ImageField(upload_to='images/', null=True, blank=True)
    image2 = models.ImageField(upload_to='images/', null=True, blank=True)
    image3 = models.ImageField(upload_to='images/', null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    month = models.CharField(max_length=255, choices=Month.choices, null=True, blank=True)
    budget = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    url = models.URLField(max_length=200, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    is_flexible = models.BooleanField(default=False)

    def __str__(self):
        return self.name