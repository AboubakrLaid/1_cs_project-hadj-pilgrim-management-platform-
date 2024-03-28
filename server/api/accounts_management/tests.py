from django.test import TestCase
from users.models import User
from municipal_wilaya.models import Wilaya, Hospital
from .serializers import MedicalAdminProfileSerializer

from rest_framework.test import APIRequestFactory

class MedicalAdminProfileSerializerTestCase(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.request = self.factory.post('/api/add_medical_admin/', {
            "user": {
                "first_name": "John",
                "last_name": "Doe",
                "email": "john.doe@example.com",
                "password": "password123",
                "gender": "M"
            },
            "hospital_id": 1,
            "work_schedule": {
                "monday": "9-5",
                "tuesday": "9-5",
                "wednesday": "9-5",
                "thursday": "9-5",
                "friday": "9-5"
            }
        })
        self.serializer = MedicalAdminProfileSerializer(context={'request': self.request})

    def test_create_medical_admin_profile(self):
        self.assertTrue(self.serializer.is_valid())
        medical_admin_profile = self.serializer.save()
