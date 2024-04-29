def winner_data(participant):
    return {
        "nin": participant.personal_profile.nin,
        "first_name": participant.first_name,
        "last_name": participant.last_name,
        "gender": participant.gender
    }