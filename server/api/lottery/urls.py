from django.urls import path
from .views import (
    participate_in_lottery,
    lottery_algorithm,
    statistics,
<<<<<<< Updated upstream
    
=======
    launch_lottery,
    reset_lottery
>>>>>>> Stashed changes
)

urlpatterns = [
    path('', participate_in_lottery),
    path('algorithm', lottery_algorithm),
    path('statistics', statistics),
<<<<<<< Updated upstream
=======
    path('result', launch_lottery),
    path('reset', reset_lottery),
>>>>>>> Stashed changes
    # path('v2/statistics', optimized_statistics),
]
