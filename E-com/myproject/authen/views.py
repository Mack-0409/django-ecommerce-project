from django.shortcuts import render, redirect

# Create your views here.

def login_(request):
    return render(request, 'login_.html')

def logout_(request):
    return render(request, 'logout_.html')

def register(request):
    return render(request, 'register.html')

'''
login 
signup
forgot password
profile data show user
reset password
'''