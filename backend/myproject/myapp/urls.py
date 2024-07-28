from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet,OrderViewSet, ReviewViewSet
from .views import  get_orders_by_contact_number

router = DefaultRouter()
router.register(r'products', ProductViewSet),
router.register(r'orders', OrderViewSet)
router.register(r'reviews', ReviewViewSet , basename='review')


urlpatterns = [
    path('', include(router.urls)),
    path('orders-by-contact/<str:contact_number>/', get_orders_by_contact_number, name='orders-by-contact-number'),
]