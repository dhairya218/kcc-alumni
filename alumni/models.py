from django.db import models
from django.contrib.auth.models import User

class Alumni(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    roll_number = models.CharField(max_length=20, unique=True)
    graduation_year = models.IntegerField()
    course = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    current_company = models.CharField(max_length=200, blank=True)
    current_position = models.CharField(max_length=200, blank=True)
    linkedin_profile = models.URLField(blank=True)
    profile_picture = models.ImageField(upload_to='alumni_profiles/', blank=True)
    
    class Meta:
        verbose_name_plural = "Alumni"
    
    def __str__(self):
        return f"{self.user.get_full_name()} - {self.roll_number}"

class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateTimeField()
    location = models.CharField(max_length=200)
    image = models.ImageField(upload_to='event_images/', blank=True)
    attendees = models.ManyToManyField(Alumni, blank=True, related_name='events')
    
    def __str__(self):
        return self.title