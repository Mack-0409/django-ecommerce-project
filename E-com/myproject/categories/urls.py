from django.urls import path
from .views import *

urlpatterns = [
    path('nike/', nike, name='nike'),
]