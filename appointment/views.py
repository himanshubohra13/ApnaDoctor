from django.shortcuts import  render, redirect
from appointment.forms import NewUserForm
from django.contrib.auth import login, logout, authenticate
from django.contrib import messages
from django.contrib.auth.forms import AuthenticationForm
from django.views.generic import TemplateView , ListView
from appointment.models import Doctor , Appointment

def register_request(request):
	if request.method == "POST":
		form = NewUserForm(request.POST)
		if form.is_valid():
			user = form.save()
			login(request, user)
			messages.success(request, "Registration successful." )
			return redirect("/auth/login/")
		messages.error(request, "Unsuccessful registration. Invalid information.")
	form = NewUserForm()
	return render (request=request, template_name="appointment/register.html", context={"register_form":form})


def login_request(request):
	if request.method == "POST":
		form = AuthenticationForm(request, data=request.POST)
		if form.is_valid():
			username = form.cleaned_data.get('username')
			password = form.cleaned_data.get('password')
			user = authenticate(username=username, password=password)
			if user is not None:
				login(request, user)
				messages.info(request, f"You are now logged in as {username}.")
				return redirect('/auth/book-appointment')
			else:
				messages.error(request,"Invalid username or password.")
		else:
			messages.error(request,"Invalid username or password.")
	form = AuthenticationForm()
	return render(request=request, template_name="appointment/login.html", context={"login_form":form})


def search(request):
	doctors = Doctor.objects.all()[:5]
	context = {
        "doctors" : doctors
    }
	return render(request , 'videocall/videocallpage.html' , context)


class BookAppointment(ListView):
	model = Doctor
	template_name = 'videocall/output.html'
	context_object_name = 'appointment'
	
	def get_queryset(self):
		obj = self.model.objects.filter(state__contains=self.request.GET['state'], 
		specialization__contains=self.request.GET['specialization'])
		return obj


def logout_request(request):
	logout(request)
	messages.info(request, "You have successfully logged out.") 
	return redirect("/")

