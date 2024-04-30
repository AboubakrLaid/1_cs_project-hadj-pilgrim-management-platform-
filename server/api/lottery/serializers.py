from rest_framework import serializers
from .models import ParticipantStatusPhase, LotteryAlgorithm
from users.models import UserInscriptionHistory, UserStatus
from users.serializers import UserStatusSerializer
from pilgrimage_info.models import Phase
from django.db import transaction
from datetime import datetime
from pilgrimage_info.models import PilgrimageSeasonInfo
import re


class ParticipantStatusPhaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParticipantStatusPhase
        fields = ["participant"]

    def create(self, validated_data):
        with transaction.atomic():
            user = validated_data["participant"]
            phase = Phase.objects.get(phase_number=1)

            status_serializer = UserStatusSerializer(data={"user": user.id})
            if status_serializer.is_valid(raise_exception=True):
                status = status_serializer.save()

            validated_data["phase"] = phase
            validated_data["status"] = status

            # user participate to the lottery
            participant_status_phase = super().create(validated_data)

            user_inscription_history = UserInscriptionHistory.objects.get(user=user)
            user_inscription_history.inscription_count += 1
            user_inscription_history.latest_inscription_year = datetime.now().year
            user_inscription_history.save()

            return participant_status_phase


class LotteryAlgorithmSerializer(serializers.ModelSerializer):
    class Meta:
        model = LotteryAlgorithm
        fields = ["algorithm"]

    def create(self, validated_data):
        try:
            season = PilgrimageSeasonInfo.objects.get(is_active=True)
            validated_data["season"] = season

            return super().create(validated_data)
        except PilgrimageSeasonInfo.DoesNotExist:
            raise serializers.ValidationError({"error": "There is no active season"})


class MunicipalGroupsSerializer(serializers.Serializer):
    municipal_groups = serializers.ListField(
        child=serializers.DictField(
            child=serializers.ListField(child=serializers.IntegerField(min_value=1))
        )
    )

    def validate_municipal_groups(self, value):
        """
        {
            "groups": [
            "grp_1": [1, 2, 3],
            "grp_2": [4, 5, 6],
        ]
        }
        """

        group_names = []
        pattern = re.compile(
            r"^grp_\d+$"
        )  # Regular expression to match 'grp_' followed by one or more digits

        for group_dict in value:
            if not isinstance(group_dict, dict) or len(group_dict) != 1:
                raise serializers.ValidationError(
                    "Each group must be a single key-value pair."
                )

            group_name = next(iter(group_dict))
            if not pattern.match(group_name):
                raise serializers.ValidationError(
                    f"The group name '{group_name}' does not match the required 'grp_<number>' pattern."
                )

            if group_name in group_names:
                raise serializers.ValidationError(
                    f"Duplicate group name detected: '{group_name}'. Each group name must be unique."
                )
            group_names.append(group_name)

        # Return the validated value if all checks pass
        return value
