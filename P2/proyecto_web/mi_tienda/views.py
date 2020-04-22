# -- Fichero mi_tienda/views.py
from django.shortcuts import render
from django.http import HttpResponse
from mi_tienda.models import Producto, Carrito
import json

# Create your views here.
# -- Vista principal de mi tienda
# -- El nombre de la vista puede ser cualquiera. Nosotros lo hemos
# -- llamado index, pero se podría haber llamado pepito
def index(request):
    productos = Producto.objects.all()
    return render(request, 'index.html', {'productos': productos})

def producto(request, prodpath):
    try:
        producto = Producto.objects.get(path__startswith=prodpath)
        return render (request, 'producto.html', {'producto': producto})
    except:
        return HttpResponse("Error 404: File not found")

def carrito(request, a):
    if a == 'show':
        context={'registered': 'false', 'carrito': '', 'precio': ''}
    else:  # -- Carrito_cliente
        try:
            c = Carrito.objects.get(cliente=request.POST['nombre'])
            context={'registered': 'true', 'carrito': json.loads(c.productos), 'precio': str(c.precio)}
        except:
            context={'registered': 'false', 'carrito': '', 'precio': ''}
    return render (request, 'carrito.html', context)

def compra(request):
    nombre=request.POST['nombre']
    prodname=request.POST['prodname']
    try:
        c = Carrito.objects.get(cliente=nombre)
    except :
        c = Carrito(cliente=nombre)
    p = json.loads(c.productos)
    producto = Producto.objects.get(nombre=prodname)
    if producto.stock > 0:
        if producto.nombre in p:
            p[p.index(producto.nombre)+1][0] += 1
        else:
            p.append(producto.nombre)
            p.append([1])
        producto.stock -= 1
        c.precio += producto.precio
        c.productos = json.dumps(p)
        producto.save()
        c.save()
    return render(request, 'index.html', {'productos': Producto.objects.all()})
