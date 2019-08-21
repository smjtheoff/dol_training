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
  
def bbox_nsl_par(request):
   
   sql = "SELECT ST_XMin(ST_Extent(geom)) as XMin,ST_YMin(ST_Extent(geom)) as YMin,ST_XMax(ST_Extent(geom)) as XMax,ST_YMax(ST_Extent(geom)) as YMax FROM public.nsl_par"
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
      "XMin" : records[0],
      "YMin" : records[1],
      "XMax" : records[2],
      "YMax" : records[3]
   }
 
   return HttpResponse(json.dumps(json_return),content_type='application/json')