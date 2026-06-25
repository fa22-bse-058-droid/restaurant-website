from django.urls import path
from .views import CategoryListView, CategoryDetailView, FoodItemListView, FoodItemDetailView

urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('categories/<slug:slug>/', CategoryDetailView.as_view(), name='category-detail'),
    path('food-items/', FoodItemListView.as_view(), name='food-item-list'),
    path('food-items/<int:pk>/', FoodItemDetailView.as_view(), name='food-item-detail'),
]
