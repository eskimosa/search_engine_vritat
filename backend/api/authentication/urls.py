from django.urls import path
from .views import UserLoginView, UserRegistrationViews, UserLogoutView

urlpatterns = [
    path('regisration/', UserRegistrationViews.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('logout/', UserLogoutView.as_view(), name='logout'),
]
