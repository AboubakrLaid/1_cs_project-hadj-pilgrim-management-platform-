from django.test import TestCase
from users.models import User
from municipal_wilaya.models import Wilaya, Hospital
from .models import MedicalAdminProfile, AdminProfile
from django.contrib.contenttypes.models import ContentType


# Create your tests here.


class ResponisbilityTestCase(TestCase):
        def setUp(self):
            self.admin = User.objects.create_user(
                username="admin",
                first_name="admin",
                last_name="admin",
                password="admin",
                email="admin@gamil.com",
                gender="M",
                role=User.IS_ADMIN,
            )
            self.medical_admin = User.objects.create_user(
                username="madmin",
                first_name="madmin",
                last_name="madmin",
                password="madmin",
                email="madmin@gamil.com",
                gender="M",
                role=User.IS_MEDICAL_ADMIN,
            )
            self.wilaya = Wilaya.objects.create(name='Mostaganem', eng_name='Mostaganem')
            self.hospital = Hospital.objects.create(name='Hospital', wilaya_id=self.wilaya, eng_name='Mostaganem')
            
            
            self.medical_admin_profile = MedicalAdminProfile.objects.create(
                user=self.medical_admin,
                content_object=self.hospital,
                object_id=self.hospital.id,
                work_schedule={'Monday':['08:00']}
            )
            
            self.admin_profile = AdminProfile.objects.create( user=self.admin,
                content_object=self.wilaya,
                object_id=self.wilaya.id
            )
        
        def test_medical_admin_profile(self, ):
            self.assertEqual(self.medical_admin_profile.user, self.medical_admin)
            self.assertEqual(self.medical_admin_profile.content_object, self.hospital)
            self.assertEqual(self.medical_admin_profile.work_schedule, {'Monday':['08:00']})
            self.assertNotEqual(self.medical_admin_profile.content_type, ContentType.objects.get_for_model(Wilaya))
            self.assertEqual(self.medical_admin_profile.content_type, ContentType.objects.get_for_model(Hospital))
            
        def test_admin_profile(self):
            self.assertEqual(self.admin_profile.user, self.admin)
            self.assertEqual(self.admin_profile.content_object, self.wilaya)
            self.assertNotEqual(self.admin_profile.content_type, ContentType.objects.get_for_model(Hospital))
            self.assertEqual(self.admin_profile.content_type, ContentType.objects.get_for_model(Wilaya))

    
