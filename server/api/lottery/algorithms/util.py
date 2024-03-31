def winner_data(participant):
    return {
        "first_name": participant.first_name,
        "last_name": participant.last_name,
        "gender": participant.gender,
        "birth_date": participant.personal_profile.birth_date,
        "inscription_count": participant.inscription_history.inscription_count,
        "latest_inscription_year": participant.inscription_history.latest_inscription_year,
    }