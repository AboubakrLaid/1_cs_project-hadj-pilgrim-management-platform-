from django.urls import path
from . import views

urlpatterns = [
    path('<int:pk>/add-patient-health-review/', views.add_patient_health_review, name='add_patient_health_review'),
]

