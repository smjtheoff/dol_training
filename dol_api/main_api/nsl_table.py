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
  
def table_nsl_par(request):
   
   sql = "SELECT id, fid_1, utmmap1, utmmap2, utmmap3, utmmap4, utmparno, scale, nsl_tno, nsl_no, nsl_name, rai, "
   sql += "ngan, wa, type, remark, shape_name, f1, f2, province, zone, nsl_name_e, prov_nam_e, f1_e, area, tambon_idn, "
   sql += "tam_code, tam_nam_t, amphoe_idn, amp_code, amphoe_t, amphoe_e, prov_code, prov_nam_t, prov_nam_1, p_code FROM public.nsl_par"

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
   else:
      sql += " LIMIT 0"

   cursor.execute(sql)
   records = cursor.fetchall()
 
   json_return = {
      "data" : [],
      "count" : len(records)
   }
 
   for row in records:
       json_dict = {
           "id"            : row[0]
           ,"fid_1"        : row[1]
         #   ,"utmmap1"      : row[2]
         #   ,"utmmap2"      : row[3]
         #   ,"utmmap3"      : row[4]
         #   ,"utmmap4"      : row[5]
         #   ,"utmparno"     : row[6]
           ,"scale"        : row[7]
           ,"nsl_tno"      : row[8]
           ,"nsl_no"       : row[9]
           ,"nsl_name"     : row[10]
           ,"rai"          : row[11]
           ,"ngan"         : row[12]
           ,"wa"           : row[13]
           ,"type"         : row[14]
           ,"remark"       : row[15]
           ,"shape_name"   : row[16]
           ,"f1"           : row[17]
           ,"f2"           : row[18]
           ,"province"     : row[19]
           ,"zone"         : row[20]
           ,"nsl_name_e"   : row[21]
           ,"prov_nam_e"   : row[22]
           ,"f1_e"         : row[23]
           ,"area"         : row[24]
           ,"tambon_idn"   : row[25]
           ,"tam_code"     : row[26]
           ,"tam_nam_t"    : row[27]
           ,"amphoe_idn"   : row[28]
           ,"amp_code"     : row[29]
           ,"amphoe_t"     : row[30]
           ,"amphoe_e"     : row[31]
           ,"prov_nam_t"   : row[32]
           ,"p_code"       : row[33]
           
       }
 
       json_return["data"].append(json_dict)

 
   return HttpResponse(json.dumps(json_return),content_type='application/json')