# Generated by Django 2.2.10 on 2020-06-02 10:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mi_tienda', '0002_carrito'),
    ]

    operations = [
        migrations.AlterField(
            model_name='carrito',
            name='productos',
            field=models.CharField(default='[]', max_length=200),
        ),
    ]
