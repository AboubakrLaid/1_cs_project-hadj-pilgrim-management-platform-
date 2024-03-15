from django.urls import path
from .views import create_pilgrimage_season_info, get_current_season, get_previous_seasons



urlpatterns = [
    path('', create_pilgrimage_season_info),
    path('current', get_current_season),
    path('previous', get_previous_seasons),
]
