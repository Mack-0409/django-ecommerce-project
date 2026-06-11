from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

# Create your views here.

def login_(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username = username, password = password)
        if user:
            login(request, user)
            return redirect('home')
        else:
            return render(request, 'login_.html', {'error':'Username or Password is wrong....!'})
    return render(request, 'login_.html')   

def logout_(request):
    logout(request)
    return redirect('login_')

def register(request):
    if request.method == 'POST':
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['pasw']
        confirm_password = request.POST['confirm_pasw']
        try:
            user = User.objects.get(username = username)
            return render(request, 'register.html', {'error':'UserName is already taken...!'})
        except:
            User.objects.create_user(
                first_name = first_name,
                last_name = last_name,
                username = username,
                email = email,
                password = password,
            )
            return redirect('login_')
    return render(request, 'register.html')

'''
login 
signup
forgot password
profile data show user
reset password
'''