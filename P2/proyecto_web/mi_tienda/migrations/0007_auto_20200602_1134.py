# Generated by Django 2.2.10 on 2020-06-02 11:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mi_tienda', '0006_auto_20200602_1132'),
    ]

    operations = [
        migrations.AlterField(
            model_name='producto',
            name='descripcion',
            field=models.CharField(default='descripción', max_length=1000),
        ),
    ]
