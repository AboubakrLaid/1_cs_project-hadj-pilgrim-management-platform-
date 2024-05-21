from rest_framework import serializers
from .models import Reservation, Flight, Room , Hotel, Airport

class AirportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Airport
        fields = ["name"]


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'

class FlightSerializer(serializers.ModelSerializer):
    airport = AirportSerializer()
    name = serializers.SerializerMethodField()
    class Meta:
        model = Flight
        fields = '__all__'

    def get_name(self, obj):
        return f"Flight {obj.id}"



class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'number', 'floor', 'type', 'available_beds']

class FloorSerializer(serializers.Serializer):
    floorNumber = serializers.IntegerField()
    rooms = RoomSerializer(many=True)

class HotelSerializer(serializers.ModelSerializer):
    male_floors = serializers.SerializerMethodField()
    female_floors = serializers.SerializerMethodField()
    floor_numbers = serializers.SerializerMethodField()

    class Meta:
        model = Hotel
        fields = ['name', 'id', 'male_floors', 'female_floors', 'floor_numbers']
    
    def get_floor_numbers(self, obj):
        return len(list(set(obj.room.values_list('floor', flat=True))))
    def get_male_floors(self, obj):
        return self.get_floors_by_type(obj, Room.RoomType.FOR_MALES)

    def get_floors_by_type(self, obj, room_type):
        rooms = obj.room.filter(type=room_type)
        floors_dict = {}
        for room in rooms:
            if room.floor not in floors_dict:
                floors_dict[room.floor] = []
            floors_dict[room.floor].append(room)

        floors = [
            {'floorNumber': floor, 'rooms': RoomSerializer(floor_rooms, many=True).data}
            for floor, floor_rooms in floors_dict.items()
        ]
        return floors

    def get_female_floors(self, obj):
        return self.get_floors_by_type(obj, Room.RoomType.FOR_FEMALES)

