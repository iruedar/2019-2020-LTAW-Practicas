# -- Fichero mi_tienda/views.py
from django.shortcuts import render

# Create your views here.
# -- Vista principal de mi tienda
# -- El nombre de la vista puede ser cualquiera. Nosotros lo hemos
# -- llamado index, pero se podría haber llamado pepito
def index(request):
    return HttpResponse("Hola! esta es la página principal de Mi tienda!")
