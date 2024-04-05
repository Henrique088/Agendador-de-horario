from django import forms
from django.contrib.auth.models import User

class LoginForms(forms.Form):
    nome_login = forms.CharField(
        label = "Nome login",
        required=True,
        max_length=100,
        widget=forms.TextInput(
            attrs={
                "class":"form-control",
                "placeholder": "Digite seu nome"
            }
        )
    )
    senha = forms.CharField(
        label="Senha",
        required=True,
        max_length=70,
        widget=forms.PasswordInput(
            attrs={
                "class": "form-control",
                "placeholder": "Digite sua senha"
            }
        )
    )

    caixa = forms.BooleanField(
        label = "Manter-me logado",
        required= False,
    )

class CadastroForms(forms.Form):
    nome_cadastro = forms.CharField(
        label= "Nome de Cadastro",
        required=True,
        max_length=100,
        widget=forms.TextInput(
            attrs={
                "class": "form-control",
                "placeholder" : "Ex: Henrique Ribeiro"
            }
        )
    )
    email=forms.EmailField(
        label= "Email",
        required=True,
        max_length=100,
        widget=forms.EmailInput(
            attrs={
                "class": "form-control",
                "placeholder": "Ex: henrique@xpto.com"
            }
        )
    )
        
    senha_1 = forms.CharField(
        label="Senha", 
        required=True,
        max_length=70,
        widget=forms.PasswordInput(
            attrs={
                "class": "form-control",
                "placeholder": "Digite a sua senha"
            }
        )
    )
        
    senha_2 = forms.CharField(
        label="Confirme sua senha", 
        required=True,
        max_length=70,
        widget=forms.PasswordInput(
            attrs={
                "class": "form-control",
                "placeholder": "Digite a sua novamente"
            }
        )
    )


    def clean_nome_cadastro(self):
        nome = self.cleaned_data.get("nome_cadastro")

        
        if nome or  User.objects.filter(username=nome).exists(): 
            if  User.objects.filter(username=nome).exists():
                raise forms.ValidationError("Nome já cadastrado")
            nome=nome.strip()
            if " " in nome:
                raise forms.ValidationError("Espaços não são permitidos nesse campo")
            
            else:
                return nome
    

  
    
    def clean_senha_2(self):
        senha_1 = self.cleaned_data.get("senha_1")

        senha_2 = self.cleaned_data.get("senha_2")

        if senha_1 and senha_2:
            if (senha_1 != senha_2):
              raise forms.ValidationError("Senhas não são iguais")

            else:
                return senha_2