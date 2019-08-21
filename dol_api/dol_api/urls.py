"""dol_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import url

from main_api import main_api
from main_api import nsl_count

from main_api import nsl_bbox

from main_api import nsl_table

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^count/nsl_par', nsl_count.count_nsl_par),

    url(r'^bbox/nsl_par', nsl_bbox.bbox_nsl_par),

    url(r'^table/nsl_par', nsl_table.table_nsl_par),

]
