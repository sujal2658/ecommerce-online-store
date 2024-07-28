from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(Product)

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 1  # Number of extra forms to display

class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'contact_number', 'country', 'first_name', 'last_name', 'address', 'apartment', 'city', 'state', 'postal_code', 'phone_number', 'payment_method', 'created_at']
    list_filter = ['created_at', 'payment_method', 'country', 'city', 'state']
    search_fields = ['contact_number', 'first_name', 'last_name', 'address', 'city', 'state', 'postal_code', 'phone_number']
    inlines = [OrderItemInline]

admin.site.register(Order, OrderAdmin)


class ReviewAdmin(admin.ModelAdmin):
    list_display = ('product', 'rating', 'comment', 'created_at')
    search_fields = ('product__name', 'rating', 'comment')
    list_filter = ('rating', 'created_at')

admin.site.register(Review, ReviewAdmin)