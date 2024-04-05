from django.shortcuts import render, redirect
from cliente.forms import LoginForms, CadastroForms
from django.contrib.auth.models import User
from django.contrib import auth
from django.contrib import messages
from django.urls import reverse

# Create your views here.


def index(request):
    if not request.user.is_authenticated:
       
        return redirect('login')
    return render(request, 'agenda/index.html')

def login(request):
    return render(request, 'login.html')

def psicologia(request):
    return render(request, 'agenda/psicologia.html')

def terapia(request):
    return render(request, 'agenda/terapia.html')



def logout(request):
    
    auth.logout(request)
    messages.success(request, 'Logout efetuado com sucesso')
    return redirect('login')

def login_cadastro(request):
    login_form = LoginForms()
    cadastro_form = CadastroForms()
    print("arroz" if 'login' in request.POST else "not")
    if request.method == 'POST':
        if 'login' in request.POST:
            login_form = LoginForms(request.POST)
            if login_form.is_valid():
                nome = login_form.cleaned_data['nome_login']
                senha = login_form.cleaned_data['senha']

                usuario = auth.authenticate(username=nome, password=senha)

                if usuario is not None:
                    auth.login(request, usuario)
                    messages.success(request, f"{nome} logado com sucesso!")
                    return redirect('index')
                else:
                    messages.error(request, "Erro ao efetuar login")
                    return redirect(reverse('login') + '#paralogin')

        elif 'cadastro' in request.POST:
            cadastro_form = CadastroForms(request.POST)
            if cadastro_form.is_valid():
                nome = cadastro_form.cleaned_data['nome_cadastro']
                email = cadastro_form.cleaned_data['email']
                senha = cadastro_form.cleaned_data['senha_1']

                if User.objects.filter(username=nome).exists():
                    messages.error(request, "Usuário já existente")
                    return redirect(reverse('login') + '#paracadastro')

                usuario = User.objects.create_user(username=nome, email=email, password=senha)
                usuario.save()
                messages.success(request, "Cadastro efetuado com sucesso")
                return redirect(reverse('login') + '#paralogin')

    return render(request, 'login.html', {'login_form': login_form, 'cadastro_form': cadastro_form})
