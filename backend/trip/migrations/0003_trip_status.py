# Generated by Django 5.0.2 on 2024-07-24 23:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trip', '0002_alter_trip_month'),
    ]

    operations = [
        migrations.AddField(
            model_name='trip',
            name='status',
            field=models.CharField(choices=[('Active', 'Active'), ('Archived', 'Archived')], default='Active', max_length=255),
        ),
    ]
