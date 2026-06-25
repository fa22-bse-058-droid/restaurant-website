from rest_framework import serializers
from .models import CartItem, Order, OrderItem
from menu.models import FoodItem
from menu.serializers import FoodItemSerializer


class CartItemSerializer(serializers.ModelSerializer):
    food_item = FoodItemSerializer(read_only=True)
    food_item_id = serializers.PrimaryKeyRelatedField(
        queryset=FoodItem.objects.all(), source='food_item', write_only=True
    )
    total_price = serializers.ReadOnlyField()

    class Meta:
        model = CartItem
        fields = ['id', 'food_item', 'food_item_id', 'quantity', 'total_price', 'created_at']


class OrderItemSerializer(serializers.ModelSerializer):
    food_item_name = serializers.CharField(source='food_item.name', read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'food_item', 'food_item_name', 'quantity', 'price_at_purchase', 'total_price']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)

    class Meta:
        model = Order
        fields = ['order_id', 'user', 'user_name', 'status', 'total_amount', 
                  'payment_mode', 'delivery_address', 'phone', 'items', 'created_at', 'updated_at']


class OrderCreateSerializer(serializers.Serializer):
    payment_mode = serializers.ChoiceField(choices=Order.PAYMENT_CHOICES, default='cash')
    delivery_address = serializers.CharField()
    phone = serializers.CharField(max_length=20)
