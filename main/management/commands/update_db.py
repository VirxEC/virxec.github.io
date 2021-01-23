import re
import requests
from django.core.management.base import BaseCommand

from main.models import Cache

class Command(BaseCommand):
    help = 'Updates the cache table in the database'

    @staticmethod
    def handle(*args, **options):
        print("Make a web request to resolve the number of commits to VirxEB")
        virxeb_comm = re.search(r"<spanclass=\"d-noned-sm-inline\">\\n<strong>(\d+)<\/strong>", "".join(str(requests.get("https://github.com/VirxEC/VirxEB").content).split())).group(1)
        print(f"Done; VirxEB_COMM = {virxeb_comm}")

        virxeb = Cache.objects.get(name="VirxEB_COMM")
        virxeb.value = virxeb_comm
        
        print("Updating the database")
        virxeb.save()

        print("Successfully updated the database")
