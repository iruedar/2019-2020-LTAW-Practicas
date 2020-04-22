from django.urls import path

# -- Importar todas las vistas de mi_tienda
from . import views

# -- Aquí se definen las URLs de nuestra tienda
# -- Metemos de momento sólo la principal (índice)

urlpatterns = [
    path('', views.index, name='index'),
    path('<prodpath>.html', views.producto, name='producto'),
    path('carrito_<a>', views.carrito, name='carrito'),
    path('comprar', views.compra, name='compra'),
]
