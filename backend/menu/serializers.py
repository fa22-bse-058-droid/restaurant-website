from rest_framework import serializers
from .models import Category, FoodItem


class FoodItemSerializer(serializers.ModelSerializer):
    current_price = serializers.ReadOnlyField()
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = FoodItem
        fields = ['id', 'name', 'description', 'price', 'discount_price', 'current_price', 
                  'is_available', 'image', 'category', 'category_name', 'created_at']


class CategorySerializer(serializers.ModelSerializer):
    food_items = FoodItemSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'image', 'is_active', 'food_items']


class CategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'image', 'is_active']
