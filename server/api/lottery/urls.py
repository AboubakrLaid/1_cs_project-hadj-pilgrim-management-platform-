from django.urls import path
from .views import (
    # participate_in_lottery,
    lottery_algorithm,
    statistics,
    launch_lottery,
    reset_lottery
)

urlpatterns = [
    # path('', participate_in_lottery),
    path('algorithm', lottery_algorithm),
    path('statistics', statistics),
    path('result', launch_lottery),
    path('reset', reset_lottery),
    # path('v2/statistics', optimized_statistics),
]
