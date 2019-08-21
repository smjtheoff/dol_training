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
  
def count_nsl_par(request):
   
   sql = "SELECT COUNT(1) FROM public.nsl_par"
   if (request.GET.get('nsl_id')):
      sql += " WHERE f1 = '"+request.GET.get('nsl_id')+"'"
   elif (request.GET.get('nsl_name')):
      sql += " WHERE nsl_name LIKE '%"+request.GET.get('nsl_name')+"%'"
   elif (request.GET.get('prov_code')):
      sql += " WHERE prov_code = '"+request.GET.get('prov_code')+"'"
   elif (request.GET.get('amphoe_idn')):
      sql += " WHERE amphoe_idn = '"+request.GET.get('amphoe_idn')+"'"
   elif (request.GET.get('tambon_idn')):
      sql += " WHERE tambon_idn = '"+request.GET.get('tambon_idn')+"'"

   cursor.execute(sql)
   records = cursor.fetchone()
 
   json_return = {
      "count" : records[0]
   }
 
   return HttpResponse(json.dumps(json_return),content_type='application/json')