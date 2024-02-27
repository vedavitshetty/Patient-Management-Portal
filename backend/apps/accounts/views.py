from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


class CustomCreateAccountView(APIView):
    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        # Check if the username or email already exists
        if User.objects.filter(username=username).exists():
            return Response(
                {"message": "Username already exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if User.objects.filter(email=email).exists():
            return Response(
                {"message": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST
            )

        # Create the new user
        user = User.objects.create_user(
            username=username, email=email, password=password
        )

        # Return user data upon successful creation
        return Response(
            {
                "message": "User account created successfully",
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                },
            },
            status=status.HTTP_201_CREATED,
        )


class CustomLoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        # Check if username and password are None
        if username is None and password is None:
            # Attempt to authenticate using token
            token_key = request.data.get("token")
            if token_key:
                token = Token.objects.filter(key=token_key).first()
                if token:
                    user = token.user
                else:
                    user = None
            else:
                user = None
        else:
            # Authenticate using username and password
            user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            # Generate a token for the authenticated user
            token, _ = Token.objects.get_or_create(user=user)
            # Return token and user data upon successful login
            return Response(
                {
                    "message": "Login successful",
                    "token": token.key,
                    "user": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                        "firstName": user.first_name,
                        "lastName": user.last_name,
                    },
                }
            )
        else:
            return Response(
                {"message": "Invalid login credentials"},
                status=status.HTTP_401_UNAUTHORIZED,
            )


class CustomLogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({"message": "Logout successful"})
