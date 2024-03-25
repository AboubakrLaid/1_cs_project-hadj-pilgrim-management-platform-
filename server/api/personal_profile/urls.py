from django.urls import path
from . import views
from .views import (
    personal_profile,
    update_personal_profile
)



urlpatterns = [
    path('', personal_profile, name='personal_profile.urls'),
    path('update', update_personal_profile, name='update_personal_profile.urls')
]

