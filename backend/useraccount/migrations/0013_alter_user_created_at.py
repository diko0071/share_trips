# Generated by Django 5.0.2 on 2024-08-04 03:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('useraccount', '0012_user_created_at_user_updated_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='created_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]