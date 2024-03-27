from django.urls import path
from . import views

urlpatterns = [
    path('search-medical-admins/', views.search_medical_admins, name='search_medical_admins'),
    
]
