from django.db import models


# Create your models here.


class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='products/')
    price_crossed = models.DecimalField(max_digits=10, decimal_places=2)
    price_correct = models.DecimalField(max_digits=10, decimal_places=2)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)
    
    image1 = models.ImageField(upload_to='products/', null=True, blank=True)
    image2 = models.ImageField(upload_to='products/', null=True, blank=True)
    image3 = models.ImageField(upload_to='products/', null=True, blank=True)
    brand = models.CharField(max_length=255, null=True, blank=True)
    color = models.CharField(max_length=255, null=True, blank=True)
    material = models.CharField(max_length=255, null=True, blank=True)
    product_dimensions = models.CharField(max_length=255, null=True, blank=True)
    mounting_type = models.CharField(max_length=255, null=True, blank=True)
    style = models.CharField(max_length=255, null=True, blank=True)
    included_components = models.CharField(max_length=255, null=True, blank=True)
    number_of_doors = models.IntegerField(null=True, blank=True)
    number_of_pieces = models.IntegerField(null=True, blank=True)
    item_weight = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    description1= models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name
    
    # models.py


class Order(models.Model):
    contact_number = models.CharField(max_length=15)
    country = models.CharField(max_length=100)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    address = models.CharField(max_length=255)
    apartment = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    phone_number = models.CharField(max_length=15)
    payment_method = models.CharField(max_length=10, choices=[('cod', 'Cash on Delivery'), ('online', 'Online Payment')])
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id} - {self.first_name} {self.last_name}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
  
    

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"
    


class Review(models.Model):
    product = models.ForeignKey(Product, related_name='reviews', on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.TextField()
    image = models.ImageField(upload_to='reviews/images/', blank=True, null=True)
    video = models.FileField(upload_to='reviews/videos/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review for {self.product.name}"