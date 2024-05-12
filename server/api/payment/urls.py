from django.urls import path
from .views import validate_transaction


urlpatterns = [
    path('validate/', validate_transaction),
]
