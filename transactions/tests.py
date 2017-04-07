from django.test import TestCase
from django.contrib.auth import get_user_model
from django.test import Client

from forms import TransactionForm
from models import Transaction, GuiltWord, GuiltLink

# Create your tests here.

class TransactionTest(TestCase):

    def setUp(self):
        user = get_user_model().objects.create_user('HalIncandenza')

    
