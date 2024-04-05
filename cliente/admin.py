from django.contrib import admin

from cliente.models import  cliente, administrador

class cliente_dados(admin.ModelAdmin):
    list_display = ("nome", "email")


class administradores(admin.ModelAdmin):

    list_display = ("id","nome")

admin.site.register(cliente, cliente_dados)
admin.site.register(administrador, administradores)


