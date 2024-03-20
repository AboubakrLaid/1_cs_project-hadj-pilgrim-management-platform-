from django.urls import path
from .views import (
    participate_in_lottery
)

urlpatterns = [
    path('', participate_in_lottery)
]
