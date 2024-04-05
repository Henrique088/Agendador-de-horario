from django.urls import path
from cliente.views import index,psicologia, terapia,login_cadastro
urlpatterns = [
   path('', index, name='index'),
   path('login/', login_cadastro, name='login'),
   path('psciologia/', psicologia, name='psicologia'),
   path('terapia', terapia, name='terapia'),  
]