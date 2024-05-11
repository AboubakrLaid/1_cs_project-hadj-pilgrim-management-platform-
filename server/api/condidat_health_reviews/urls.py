from django.urls import path
from . import views

urlpatterns = [
    path('<int:pk>/add-patient-health-review/', views.add_patient_health_review, name='add_patient_health_review'),
    path('<int:pk>/add-disease/', views.add_disease_to_review, name='add_disease_to_review'),
    path('<int:pk>/delete-disease/', views.delete_disease_from_review, name='delete_disease_from_review'),
    path('<int:pk>/add-treatment/', views.add_treatment_to_review, name='add_treatment_to_review'),
    path('<int:pk>/delete-treatment/', views.delete_treatment_from_review, name='delete_treatment_from_review'),
]

