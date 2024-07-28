from django.utils import timezone
from datetime import timedelta
from django.shortcuts import render
from rest_framework import viewsets
from .models import Product,Order,OrderItem , Review
from .serializers import ProductSerializer, OrderSerializer,OrderSerializerConf, ReviewSerializer
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


def home(request):
    return HttpResponse("Welcome to the Product API")

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

@api_view(['GET'])
def get_orders_by_contact_number(request, contact_number):
    try:

        three_days_ago = timezone.now() - timedelta(days=3)
        orders = Order.objects.filter(contact_number=contact_number, created_at__gte=three_days_ago)
        
        if orders.exists():
            serializer = OrderSerializerConf(orders, many=True)
            return Response(serializer.data)
        else:
            return Response({"detail": "No Order matches the given query."}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=400)
    


class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        product_id = self.request.query_params.get('product')
        if product_id:
            return Review.objects.filter(product_id=product_id)
        return Review.objects.all()