from django.urls import path
from .views import create_pilgrimage_season_info, get_current_season, get_all_seasons, mark_season_as_finished



urlpatterns = [
    path('', create_pilgrimage_season_info),
    path('current', get_current_season),
    path('all', get_all_seasons),
    path('finished', mark_season_as_finished),
]
