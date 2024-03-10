from django.http import JsonResponse
from .models import Drink
from .serializers import DrinkSerializer
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response


@api_view(['GET', 'POST'])
def drink_list(request):


    #get all drinks
    #serialize them
    # return json
    if request.method == 'GET':
        drinks = Drink.objects.all()
        serializer = DrinkSerializer(drinks, many = True)
        return JsonResponse({'drinks': serializer.data}) # , safe=False
    
    
    if request.method == 'GET':
        serializer = DrinkSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)