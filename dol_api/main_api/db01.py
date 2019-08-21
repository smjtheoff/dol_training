from django.http import HttpResponse
import json
import psycopg2

try:
    connection = psycopg2.connect(user = "docker",
                                  password = "docker",
                                  host = "172.17.0.1",
                                  port = "5432",
                                  database = "dol")
    cursor = connection.cursor()
except:
    print("Database Connect Error.")
    
cur = connection.cursor()

def test_db(request):

    cursor.execute("SELECT * FROM test_dol")
    records = cursor.fetchall() 

    json_return = []

    for row in records:
        json_dict = {
            "key1" : row[0]
            ,"key2" : row[1]
        }

        json_return.append(json_dict)

    return HttpResponse(json.dumps(json_return),content_type='application/json')