from django.urls import path
from . import views

urlpatterns = [
    path('add-medical-admin/', views.add_medical_admin, name='add_medical_admin'),
    path('delete-medical-admin/<int:pk>/', views.delete_medical_admin, name='delete_medical_admin'),
    
    ]
