from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import CustomUser
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from django.contrib.auth.hashers import make_password
from uuid import uuid4
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    # 인증된 사용자의 정보를 반환합니다.
    user = request.user
    return Response({
        'name': user.name,
        'email': user.email
    })
class Login(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = CustomUser.objects.filter(email=email).first()
        if user is None or not user.check_password(password):
            return Response({
                'access': False,
                'error': 'Invalid email or password.'
            }, status=400)
        tokens = get_tokens_for_user(user)
        return Response({
            'tokens': tokens,
            'access': True,
            'user': {
                'email': user.email,
                'name': user.name  # 예시로 이름도 추가합니다.
            }
        }, status=200)
        

class Register(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        name = request.data.get('name')
        email = request.data.get('email')
        password = request.data.get('password')
        verify = request.data.get('verify')
        if CustomUser.objects.filter(email=email).exists() or password != verify:
            return Response({
                'access': False,
                'error': 'Email is already in use or the passwords do not match.'
            }, status=400)
        
        user = CustomUser.objects.create(
            name=name,
            email=email,
            password=make_password(password),
        )
        
        tokens = get_tokens_for_user(user)
        return Response({
            'tokens': tokens,
            'email': email,
            'access': True,
        }, status=201)
