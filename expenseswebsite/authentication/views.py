from django.shortcuts import render, redirect
from django.views import View
import json
from django.http import JsonResponse
from django.contrib.auth.models import User
from validate_email import validate_email
from django.contrib import messages, auth
from django.contrib.auth import authenticate, login
# from django.core.mail import EmailMessage

# Create your views here

class LoginView(View):
  def get(self, request):
    return render(request, 'authentication/login.html')

  def post(self, request):
    username=request.POST.get('username')
    password=request.POST.get('password')

    if username and password:
      user = authenticate(username=username, password=password)

      if user is not None:
        if user.is_active:
          login(request, user)
          messages.success(request, f'Welcome, {user.username}! You are now logged in')
          return redirect('expenses')
        else:
          messages.error(request, 'Your account is not active')
      else:
        messages.error(request, 'Invalid username or password')
    return render(request, 'authentication/login.html')



class LogoutView(View):
  def post(self, request):
    auth.logout(request)
    messages.success(request, 'You have been logged out')
    return redirect('login')



class RegistrationView(View):
  def get(self, request):
      return render(request, 'authentication/register.html')

  def post(self, request):
    #Get Data
    #Validate
    #Create A User Account
    username=request.POST['username']
    email=request.POST['email']
    password=request.POST['password']

    context={
      'fieldValues':request.POST
    }
    if not User.objects.filter(username=username).exists():
      if not User.objects.filter(email=email).exists():
        if len(password) < 6:
          messages.error(request, 'Password too short')
          return render(request, 'authentication/register.html', context)

        user = User.objects.create_user(username=username, email=email)
        user.set_password(password)
        user.is_active=True
        user.save()
        messages.success(request, 'Account successfully created')
        return render(request, 'authentication/register.html')

    return render(request, 'authentication/register.html')

class UsernameValidationView(View):
  def post(self, request):
      data=json.loads(request.body)
      username=data['username']
      if not str(username).isalnum():
        return JsonResponse({'username_error': 'Username should only contain letters'}, status=400)
      if User.objects.filter(username=username).exists():
        return JsonResponse({'username_error': 'Username is taken, please choose another'}, status=400)
      return JsonResponse({'username_valid': True})

class EmailValidationView(View):
  def post(self, request):
      data=json.loads(request.body)
      email=data['email']
      if not validate_email(email):
        return JsonResponse({'email_error': 'Email is not valid, enter valid email'}, status=400)
      if User.objects.filter(email=email).exists():
        return JsonResponse({'email_error': 'email is in use, please choose another'}, status=400)
      return JsonResponse({'email_valid': True})
