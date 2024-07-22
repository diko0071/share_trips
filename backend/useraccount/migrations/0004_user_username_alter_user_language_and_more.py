# Generated by Django 5.0.2 on 2024-07-21 17:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('useraccount', '0003_alter_user_name_alter_user_photo'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='username',
            field=models.CharField(blank=True, max_length=255, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='language',
            field=models.CharField(blank=True, choices=[('English', 'English'), ('Spanish', 'Spanish'), ('French', 'French'), ('German', 'German'), ('Italian', 'Italian'), ('Japanese', 'Japanese'), ('Chinese', 'Chinese'), ('Russian', 'Russian'), ('Korean', 'Korean')], max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='travel_status',
            field=models.CharField(blank=True, choices=[('Ready to travel', 'Ready to travel'), ('Not ready to travel', 'Not ready to travel'), ('Will be ready soon', 'Will be ready soon')], max_length=255, null=True),
        ),
    ]