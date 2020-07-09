import json

import requests
from django.core.management.base import BaseCommand

from main.models import Cache

class Command(BaseCommand):
    help = 'Updates the cache table in the database'

    @staticmethod
    def handle(*args, **options):
        print("Make a web request to resolve the number of commits to VirxEB")
        virxeb_comm = str(len(json.loads(requests.get("https://api.github.com/repos/VirxEC/VirxEB/commits?per_page=9999").content)))
        print(f"Done; VirxEB_COMM = {virxeb_comm}")

        virxeb = Cache.objects.get(name="VirxEB_COMM")
        virxeb.value = virxeb_comm
        
        print("Updating the database")
        virxeb.save()

        print("Successfully updated the database")
