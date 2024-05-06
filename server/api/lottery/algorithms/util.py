def winner_data(participant):
    gender = participant.gender
    return {
        "nin": participant.personal_profile.nin,
        "first_name": participant.first_name,
        "last_name": participant.last_name,
        "gender": gender,
        "c_first_name": participant.companion.first_name if gender == "F" else None,
        "c_last_name": participant.companion.last_name if gender == "F" else None,
    }