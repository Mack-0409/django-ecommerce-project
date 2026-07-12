from django.urls import path
from .views import *

urlpatterns = [
    path('nike/', nike, name='nike'),
    path('bacca/', bacca, name='bacca'),
    path('adidas/', adidas, name='adidas'),
    path('puma/', puma, name='puma'),
    path('reebok/', reebok, name='reebok'),
    path('polo/', polo, name='polo'),
    path('new-balance/', new_balance, name='new_balance'),
    path('calvin-klein/', calvin_klein, name='calvin_klein'),
    path('converse/', converse, name='converse'),
    path('fila/', fila, name='fila'),
    path('gucci/', gucci, name='gucci'),
    path('h-and-m/', H_and_M, name='H_and_M'),
    path('levis/', levis, name='levis'),
    path('off-white/', off_white, name='off_white'),
    path('skechers/', skechers, name='skechers'),
    path('supreme/', supreme, name='supreme'),
    path('timberland/', timberland, name='timberland'),
    path('under-armour/', under_armour, name='under_armour'),
    path('vans/', vans, name='vans'),
    path('zara/', zara, name='zara'),
    path('tommy-hilfiger/', tommy_hilfiger, name='tommy_hilfiger')
]