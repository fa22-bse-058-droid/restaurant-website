from django.urls import path
from .views import (
    CartView, CartItemUpdateView, CartClearView,
    OrderCreateView, OrderListView, OrderDetailView, OrderCancelView,
    AdminOrderListView, AdminOrderStatusView, AdminStatsView
)

urlpatterns = [
    # Cart
    path('cart/', CartView.as_view(), name='cart'),
    path('cart/add/', CartView.as_view(), name='cart-add'),
    path('cart/update/<int:pk>/', CartItemUpdateView.as_view(), name='cart-update'),
    path('cart/remove/<int:pk>/', CartItemUpdateView.as_view(), name='cart-remove'),
    path('cart/clear/', CartClearView.as_view(), name='cart-clear'),

    # Orders
    path('orders/create/', OrderCreateView.as_view(), name='order-create'),
    path('orders/', OrderListView.as_view(), name='order-list'),
    path('orders/<uuid:order_id>/', OrderDetailView.as_view(), name='order-detail'),
    path('orders/<uuid:order_id>/cancel/', OrderCancelView.as_view(), name='order-cancel'),

    # Admin
    path('admin/orders/', AdminOrderListView.as_view(), name='admin-orders'),
    path('admin/orders/<uuid:order_id>/status/', AdminOrderStatusView.as_view(), name='admin-order-status'),
    path('admin/stats/', AdminStatsView.as_view(), name='admin-stats'),
]
