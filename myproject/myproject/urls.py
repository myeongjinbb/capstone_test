
from django.contrib import admin
from django.urls import path, include
from openapp.views import chat_view, CreateRoom, test, fetch_chat_history, list_chat_rooms
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('chat/<str:chat_room_id>/', chat_view, name='chat'),  # Changed int to str for UUID
    path('createRoom/', CreateRoom.as_view(), name='createRoom'),
    path('fetch_chat_history/<str:chat_room_id>/', fetch_chat_history, name='fetch_chat_history'),
    path('list_chat_rooms/', list_chat_rooms, name='list_chat_rooms'),  # New URL for listing chat rooms

    path('test/', test),
    path('', include('user.urls')),    
]
