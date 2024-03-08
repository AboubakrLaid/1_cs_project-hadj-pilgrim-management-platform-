from django.contrib import admin
from .models import User, UserInscriptionHistory, UserStatus, UserVerificationCode, UserEmailVerification

# Register your models here.
admin.site.register(User)
admin.site.register(UserInscriptionHistory)
admin.site.register(UserStatus)
admin.site.register(UserVerificationCode)
admin.site.register(UserEmailVerification)