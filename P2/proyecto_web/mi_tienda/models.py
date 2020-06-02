from django.db import models
import json

# Create your models here.
class Producto(models.Model):
    """Modelo de datos de mis productos"""

    nombre = models.CharField(max_length=50)
    stock = models.IntegerField(default=0)
    precio = models.FloatField()
    img = models.CharField(max_length=50)
    path = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=1100, default="descripción")

    # -- Usamos el nombre para identificar
    # -- el producto
    def __str__(self):
        return self.nombre


class Carrito(models.Model):
    productos = models.CharField(max_length=200, default="[]")
    cliente = models.CharField(max_length=50)
    precio = models.FloatField(default=0.0)

    # -- Imprimir
    def __str__(self):
        return self.cliente
