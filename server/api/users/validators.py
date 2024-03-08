from rest_framework.validators import UniqueValidator
from .models import User

unique_email = [
    UniqueValidator(
        queryset=User.objects.all(), lookup="exact", message="email already used"
    )
]