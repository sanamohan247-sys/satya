from django.urls import path

from crud_app import views

urlpatterns = [
    path('emp_create/',views.employee_create, name='emp_create')
]