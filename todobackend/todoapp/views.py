# from rest_framework import status
# from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import todo
from .serializer import todoSerializer


class taskViewsets(ModelViewSet):
    queryset = todo.objects.all()
    serializer_class = todoSerializer