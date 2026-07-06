from django.shortcuts import render,redirect
from .models import Employee
from .forms import EmployeeForm

# Create your views here.

def employee_create(request):
    if request.method == 'POST':
        form = EmployeeForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('emp_create')
    else:
        form = EmployeeForm()
    return render(request, 'emp_create.html',{'form':form})