from django.urls import path
from .views import (
    get_all_flights,
    # reserve_flight,
    get_all_hotels_and_rooms,
    # reserve_room,
    does_user_have_reservation,
    reserve
)

# /reservation/ those

urlpatterns = [
    path('', does_user_have_reservation),
    path('flights/', get_all_flights),
    # path('reserve-flight/', reserve_flight),
    path('hotels-rooms/', get_all_hotels_and_rooms),
    path('reserve/', reserve)
    # path('reserve-room/', reserve_room)
]
