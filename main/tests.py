from django.contrib.auth.models import AnonymousUser, User
from django.test import TestCase, RequestFactory

from .views import home


class SimpleTest(TestCase):
    def setUp(self):
        # Every test needs access to the request factory.
        self.factory = RequestFactory()

    def test_details(self):
        # Create an instance of a GET request.
        request = self.factory.get("/")
        request.user = AnonymousUser()

        response = home(request)
        self.assertEqual(response.status_code, 200)
