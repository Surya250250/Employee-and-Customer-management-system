from .models import Employee
from .serializers import EmployeeSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def employees_view(request):
    if request.method == 'GET':
        data = Employee.objects.all()
        serializer = EmployeeSerializer(data, many=True)
        return Response({'employees': serializer.data})

    elif request.method == 'POST':
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'employee': serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def employee_view(request, id):
    try:
        data = Employee.objects.get(pk=id)
    except Employee.DoesNotExist:
        # raise Http404('Employee does not exist')
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = EmployeeSerializer(data)
        return Response({'employee': serializer.data})
    elif request.method == 'DELETE':
        data.delete()
        return Response(status=status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = EmployeeSerializer(data, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'employee': serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    