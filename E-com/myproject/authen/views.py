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


def forgot_pasw(request):
    if request.method == 'POST':
        if 'username' in request.POST:
            username = request.POST['username']
            try:
                user = User.objects.get(username = username)
                request.session['fpuser'] = user.username
                return render(request, 'forgot_pasw.html', {'new':True})
            except:
                return render(request, 'forgot_pasw.html', {'error': True})

        if 'pasw' in request.POST:
            username = request.session.get('fpuser')
            user = User.objects.get(username = username)
            new_pasw = request.POST['pasw']
            user.set_password(new_pasw)
            user.save()
        return redirect(login_)

    return render(request, 'forgot_pasw.html' )


def update(request):
    return render(request, 'update.html')

'''
profile data show user imcluding images
'''