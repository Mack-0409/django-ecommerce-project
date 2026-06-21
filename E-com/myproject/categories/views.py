from django.shortcuts import render

# Create your views here.

def nike(request):
    return render(request, 'nike.html')