from django.urls import path
from . import views
from .views import (
    personal_profile,
)



urlpatterns = [
    path('', personal_profile, name='personal_profile.urls'),
]

