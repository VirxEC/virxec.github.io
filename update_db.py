import json

import requests

from main.models import Cache

data = requests.get("https://api.github.com/repos/VirxEC/VirxEB/commits?per_page=9999").content

virxeb = Cache.objects.get(name="VirxEB_COMM")
virxeb.value = str(len(data))
virxeb.save()
