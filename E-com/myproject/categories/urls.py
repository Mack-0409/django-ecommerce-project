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
]