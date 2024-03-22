from django.urls import path
from .views import (
    participate_in_lottery,
    lottery_algorithm,
    statistics,
    
)

urlpatterns = [
    path('', participate_in_lottery),
    path('algorithm', lottery_algorithm),
    path('statistics', statistics),
    # path('v2/statistics', optimized_statistics),
]
