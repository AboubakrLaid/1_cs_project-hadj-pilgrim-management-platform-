from django.urls import path
from .views import (
    participate_in_lottery,
    lottery_algorithm
    
)

urlpatterns = [
    path('', participate_in_lottery),
    path('algorithm', lottery_algorithm),
]
