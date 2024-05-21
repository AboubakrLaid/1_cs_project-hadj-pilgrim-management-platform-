from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Reservation, Flight, Hotel, Room
from .serializers import ReservationSerializer, FlightSerializer, HotelSerializer, RoomSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def does_user_have_reservation(request):
    try:
        reservation = Reservation.objects.get(user=request.user)
        serializer = ReservationSerializer(reservation)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Reservation.DoesNotExist:
        return Response({'has_reservation': False}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_flights(request):
    user_wilaya = request.user.wilaya  
    flights = Flight.objects.filter(wilaya=user_wilaya)
    serializer = FlightSerializer(flights, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reserve_flight(request):
    flight_id = request.data.get('flight_id')
    try:
        flight = Flight.objects.get(id=flight_id)
    except Flight.DoesNotExist:
        return Response({'message': 'Flight not found'}, status=status.HTTP_404_NOT_FOUND)

    if flight.available_seats > 0:
        reservation = Reservation.objects.create(user=request.user, flight=flight)
        flight.available_seats -= 1
        flight.save()
        serializer = ReservationSerializer(reservation)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response({'message': 'No available seats for this flight'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_hotels_and_rooms(request):
    user_gender = request.user.gender  
    reservations = Reservation.objects.filter(user=request.user)
    hotels_with_rooms = []
    for reservation in reservations:
        hotel = reservation.room.hotel
        if user_gender == hotel.gender:
            hotels_with_rooms.append({'hotel_name': hotel.name, 'room_number': reservation.room.room_number})
    return Response({'hotels_with_rooms': hotels_with_rooms}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reserve_room(request):
    room_id = request.data.get('room_id')
    try:
        room = Room.objects.get(id=room_id)
    except Room.DoesNotExist:
        return Response({'message': 'Room not found'}, status=status.HTTP_404_NOT_FOUND)

    if room.available_beds > 0:
        reservation = Reservation.objects.get(user=request.user)
        reservation.room = room
        reservation.save()
        room.available_beds -= 1
        room.save()
        serializer = ReservationSerializer(reservation)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response({'message': 'No available beds in this room'}, status=status.HTTP_400_BAD_REQUEST)
