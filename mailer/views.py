from django.shortcuts import render
from models import Mate
from forms import MailerForm
from django.http import JsonResponse

# Create your views here.

def mailer_submit(request):
    if request.method == 'POST':
        # Get everything from form
        request.POST = request.POST.copy()
        if request.POST['mobile']:
            if request.POST['mobile'][0] == '0':
                request.POST['mobile'] = '+44' + request.POST['mobile'][1:]
        form = MailerForm(request.POST)
        if form.is_valid():
            cd = form.cleaned_data
            email = cd['email']
            mobile = cd['mobile']
            text = cd['text']
            whatsapp = cd['whatsapp']
            group = cd['group']
            mate = Mate(email = email, mobile = mobile, text = text, whatsapp = whatsapp, group = group)
            mate.save()
            response = {'success': 'success!'}
        else:
            response = form.errors
    else:
        response = {}
    return JsonResponse(response, safe=False)
