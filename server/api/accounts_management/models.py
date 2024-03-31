from django.db import models
from users.models import User
from municipal_wilaya.models import Wilaya, Hospital
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from django.db.models import JSONField


class BaseResponsibility(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    
    # relation between this model and other models
    # this would be the id of the model from the django_content_type table
    # ContentType.objects.get_for_model(model_name)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    # the id of the object that is related to this model
    # it can be the id of a hospital, wilaya.
    object_id = models.PositiveIntegerField()
    # the object that is related to this model
    content_object = GenericForeignKey('content_type', 'object_id')
    
    class Meta:
        abstract = True
        
     
        
class MedicalAdminProfile(BaseResponsibility):
    # profile_picture = models.ImageField(upload_to='medical_admins/profile_pictures/', null=True, blank=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='medical_admin_profile')
    work_schedule = JSONField(default=dict)
    
    def save(self, *args, **kwargs):
        if self.content_type != ContentType.objects.get_for_model(Hospital):
            raise ValueError('Medical Admin Profile must be related to a Hospital')
        super().save(*args, **kwargs)
        
        
class AdminProfile(BaseResponsibility):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='admin_profile')
    def save(self, *args, **kwargs):
        if self.content_type != ContentType.objects.get_for_model(Wilaya):
            raise ValueError('Admin Profile must be related to a Wilaya')
        super().save(*args, **kwargs)

