from django.apps import AppConfig


class PersonalProfileConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'personal_profile'

class WilayaConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'wilaya'

class MunicipalConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'municipal'

class HospitalConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'hospital'    

