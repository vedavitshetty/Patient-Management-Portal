from django.urls import path
from .views import CustomCreateAccountView, CustomLoginView, CustomLogoutView

urlpatterns = [
    path("register/", CustomCreateAccountView.as_view(), name="register"),
    path("login/", CustomLoginView.as_view(), name="login"),
    path("logout/", CustomLogoutView.as_view(), name="logout"),
]
