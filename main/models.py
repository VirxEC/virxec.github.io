from django.db import models

class Version(models.Model):
    name = models.CharField(max_length=32)
    major = models.IntegerField(default=0)
    minor = models.IntegerField(default=0)
    bugFix = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.major}.{self.minor}.{self.bugFix}"


class Cache(models.Model):
    name = models.CharField(max_length=32)
    value = models.CharField(max_length=128)

    def __str__(self):
        return self.value
