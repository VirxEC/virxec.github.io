from django.contrib.auth.models import AnonymousUser, User
from django.test import TestCase, RequestFactory
from django.shortcuts import reverse

from . import views


class SimpleTest(TestCase):
    def setUp(self):
        # Every test needs access to the request factory.
        self.factory = RequestFactory()

    def test_details(self):
        # Create an instance of a GET request.

        def get_request(path):
            request = self.factory.get(reverse(path))
            request.user = AnonymousUser()

        response = views.home(get_request("main_home"))
        self.assertEqual(response.status_code, 200)

        response = views.virxeb(get_request("virxeb"))
        self.assertEqual(response.status_code, 200)

        response = views.virxeb(get_request("virxerlu"))
        self.assertEqual(response.status_code, 200)

        response = views.options(get_request("minecraft_curseforge"))
        self.assertEqual(response.status_code, 200)

        response = views.virxeb(get_request("rl_ball_sym"))
        self.assertEqual(response.status_code, 200)

        response = views.options(get_request("options"))
        self.assertEqual(response.status_code, 200)
