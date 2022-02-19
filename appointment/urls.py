from os import name
from django.urls import path
from appointment import views   

urlpatterns = [
    path("register", views.register_request, name="register"),
    path("login/", views.login_request, name="login"),
    path("book-appointment" , views.search , name="appointment"),
    path("search-and-book-appointment" , views.BookAppointment.as_view() , name="search"),
    path("logout", views.logout_request, name= "logout"),
]