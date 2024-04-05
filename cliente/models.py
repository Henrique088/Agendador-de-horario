from django.db import models

# Create your models here.

class cliente(models.Model):
    nome = models.CharField(max_length = 100, null = False, blank = False)
    email = models.EmailField(null = False, blank = False )
    # senha = models.PasswordField()
 


class administrador(models.Model):
    nome = models.CharField(max_length = 100, null = False, blank = False)