from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def does_user_have_reservation(request):
    # this function will check if the user has a reservation or not
    # so it will check if it Has a reservation instance in the Reservation model
    pass

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_flights(request):
    # use the user wilaya to get all the flights that are associated with the wilaya
    pass



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reserve_flight(request):
    # here we need the flight id
    
    # so we can get the flight and check if the flight has enough seats to reserve
    # if yes we reserve the flight for the user and decrement the available seats
    # the reservation will be by creating an instance of Reservation model 
    # however the room will be null at this point
    pass


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_hotels_and_rooms(request):
    # by using the user reservation 
    # we will return the name of the hotels with their rooms
    # of course we will return the rooms according to the user gender
    pass
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reserve_room(request):
    # here we need the room id
    
    # check if the room has enough beds to reserve
    # if yes we reserve the room for the user and decrement the available beds
    # the reservation will be by 'UPDATING' the instance of Reservation model
    # by adding the room id to it
    pass