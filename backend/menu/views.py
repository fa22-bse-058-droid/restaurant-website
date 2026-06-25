from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Category, FoodItem
from .serializers import CategorySerializer, CategoryListSerializer, FoodItemSerializer


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategoryListSerializer


class CategoryDetailView(generics.RetrieveAPIView):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    lookup_field = 'slug'


class FoodItemListView(generics.ListAPIView):
    queryset = FoodItem.objects.filter(is_available=True)
    serializer_class = FoodItemSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category__slug']
    search_fields = ['name', 'description']


class FoodItemDetailView(generics.RetrieveAPIView):
    queryset = FoodItem.objects.all()
    serializer_class = FoodItemSerializer
