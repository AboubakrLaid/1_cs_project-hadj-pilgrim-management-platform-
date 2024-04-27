from django.urls import path
from . import views
from .views import (
    personal_profile,
   accept_or_refuse_candidate
)



urlpatterns = [
    path('', personal_profile, name='personal_profile.urls'),
    path('decision/', accept_or_refuse_candidate, name='accept_or_refuse_candidate.urls')
]

