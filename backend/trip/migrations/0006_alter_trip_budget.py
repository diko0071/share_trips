# Generated by Django 5.0.2 on 2024-07-26 21:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trip', '0005_trip_currency'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trip',
            name='budget',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
