
from django.contrib import admin
from django.urls import path, include
# import todoapp.urls
from rest_framework.routers import DefaultRouter
from todoapp import views

router = DefaultRouter()
router.register(r'tasks', views.taskViewsets)
urlpatterns = [
    path('admin/', admin.site.urls),
    # path('todoapp/', include(todoapp.urls)),
    path('api/', include(router.urls)),
]
