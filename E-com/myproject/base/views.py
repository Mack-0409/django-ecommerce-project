from django.shortcuts import render, redirect
from .models import Profile
from django.contrib.auth.decorators import login_required

def home(request):
    return render(request, 'home.html')

@login_required(login_url='login_')
def profile(request):
    profile, created = Profile.objects.get_or_create(user=request.user)
    return render(request, 'profile.html', {'profile': profile})


def newsletter(request):
    return render(request, 'newsletter.html' )