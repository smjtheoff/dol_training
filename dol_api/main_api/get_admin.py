from django.http import HttpResponse
import json
import psycopg2
 
try:
   connection = psycopg2.connect(user = "postgres",
                                 password = "postgres",
                                 host = "172.17.0.1",
                                 port = "5432",
                                 database = "nsl")
   cursor = connection.cursor()
except:
   print("Database Connect Error.")
  
def get_admin(request):
   
   sql = "SELECT DISTINCT prov_code, prov_nam_e, prov_nam_t FROM public.amphoe"

   cursor.execute(sql)
   records = cursor.fetchall()
 
   json_return = {
      "data" : [],
      "count" : len(records)
   }
 
   for row in records:
       json_dict = {
           "prov_code"          : int(row[0])
           ,"prov_nam_e"        : row[1]  
           ,"prov_nam_t"        : row[2]       
       }
 
       json_return["data"].append(json_dict)
 
   return HttpResponse(json.dumps(json_return),content_type='application/json')