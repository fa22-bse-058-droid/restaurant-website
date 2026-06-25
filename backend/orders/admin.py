from django.contrib import admin
from .models import CartItem, Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ['food_item', 'quantity', 'price_at_purchase']


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['order_id', 'user', 'status', 'total_amount', 'payment_mode', 'created_at']
    list_filter = ['status', 'payment_mode', 'created_at']
    search_fields = ['order_id', 'user__email', 'delivery_address']
    list_editable = ['status']
    inlines = [OrderItemInline]
    readonly_fields = ['order_id', 'created_at', 'updated_at']


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ['food_item', 'quantity', 'user', 'session_id', 'created_at']
    list_filter = ['created_at']
    search_fields = ['food_item__name', 'user__email']
