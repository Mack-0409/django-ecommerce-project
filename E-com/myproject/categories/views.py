from django.shortcuts import render

def nike(request):
    return render(request, 'nike.html')

def bacca(request):
    return render(request, 'bacca.html')

def adidas(request):
    return render(request, 'adidas.html')

def puma(request):
    return render(request, 'puma.html')

def reebok(request):
    return render(request, 'reebok.html')

def polo(request):
    return render(request, 'polo.html')

def new_balance(request):
    return render(request, 'new_balance.html')