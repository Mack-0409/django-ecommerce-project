from django .urls import path
from .views import *

urlpatterns = [
    path('login_/', login_, name='login_'),
    path('logout_/', logout_, name='logout_'),
    path('register/', register, name='register'),
    path('forgot_pasw/', forgot_pasw, name='forgot_pasw'),
]