from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("sudah-maghrib-belum/", include("prayer_time.urls")),
    path("", include("pamanhandy.urls")),  # New under construction page
]
