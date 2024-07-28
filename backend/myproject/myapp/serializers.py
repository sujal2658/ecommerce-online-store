from rest_framework import serializers
from .models import Product,Order, OrderItem, Review

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'



class OrderItemSerializer(serializers.ModelSerializer):
    
    
    class Meta:
        model = OrderItem
        fields = ['product', 'quantity', 'price', ]

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    
   

    class Meta:
        model = Order
        fields = ['contact_number', 'country', 'first_name', 'last_name', 'address', 'apartment', 'city', 'state', 'postal_code', 'phone_number', 'payment_method', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        return order
    


class OrderItemSerializerConf(serializers.ModelSerializer):
    product = ProductSerializer()
    
    class Meta:
        model = OrderItem
        fields = ['product', 'quantity', 'price',]
    

class OrderSerializerConf(serializers.ModelSerializer):
    items = OrderItemSerializerConf(many=True)
    
   

    class Meta:
        model = Order
        fields = ['contact_number', 'country', 'first_name', 'last_name', 'address', 'apartment', 'city', 'state', 'postal_code', 'phone_number', 'payment_method', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        return order



class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'product', 'rating', 'comment', 'image', 'video', 'created_at']
