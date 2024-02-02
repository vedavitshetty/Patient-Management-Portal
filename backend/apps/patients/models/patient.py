from django.db import models

class Patient(models.Model):
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    status = models.CharField(max_length=50)
    address = models.TextField()
