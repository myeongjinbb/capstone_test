
from django.contrib import admin
from django.urls import path, include
from openapp.views import CreateRoom
from .views import Login, Register
from .views import get_user_info  # get_user_info 함수를 import

urlpatterns = [
    path('login/', Login.as_view(), name='login'),
    path('register/', Register.as_view(), name='register'),
    path('get_user_info/', get_user_info, name='get_user_info'),
    path('', Login.as_view(), name='login'),

]
