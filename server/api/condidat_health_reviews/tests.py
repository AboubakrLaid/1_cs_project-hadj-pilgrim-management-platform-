from django.test import TestCase
from users.models import User, UserStatus
from condidat_health_reviews.models import PatientHealthReview
from condidat_health_reviews.serializers import PatientHealthReviewSerializer

class PatientHealthReviewSerializerTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(username='test_user')
        self.review = PatientHealthReview.objects.create(user=self.user, is_sick=True, is_healthy=False)
        self.serializer = PatientHealthReviewSerializer(instance=self.review)

    def test_update_user_status_accepted(self):
        data = {'is_accepted': True}
        serializer = PatientHealthReviewSerializer(instance=self.review, data=data, partial=True)
        self.assertTrue(serializer.is_valid())
        serializer.save()
        self.review.refresh_from_db()
        self.assertEqual(self.review.user.status.status, UserStatus.Status.CONFIRMED)
        self.assertEqual(self.review.user.status.process, UserStatus.Process.PAYMENT)

    def test_update_user_status_rejected(self):
        data = {'is_accepted': False}
        serializer = PatientHealthReviewSerializer(instance=self.review, data=data, partial=True)
        self.assertTrue(serializer.is_valid())
        serializer.save()
        self.review.refresh_from_db()
        self.assertEqual(self.review.user.status.status, UserStatus.Status.REJECTED)
