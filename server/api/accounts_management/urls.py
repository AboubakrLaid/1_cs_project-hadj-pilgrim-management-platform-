from django.urls import path
from . import views

urlpatterns = [
    path('add-medical-admin/', views.add_medical_admin, name='add_medical_admin'),
]
