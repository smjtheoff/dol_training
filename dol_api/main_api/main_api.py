from django.http import HttpResponse
import json

def hello(request):

    json_return = {
        "Hello": "World"
    }

    return HttpResponse(json.dumps(json_return),content_type='application/json')