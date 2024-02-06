from django.urls import path
from cliente.views import index, login, psicologia, terapia

urlpatterns = [
   path('', index, name='index'),
   path('login/', login, name='login'),
   path('psciologia/', psicologia, name='psicologia'),
   path('terapia', terapia, name='terapia'),
]