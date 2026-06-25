import uuid
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from django.db import transaction
from .models import CartItem, Order, OrderItem
from .serializers import CartItemSerializer, OrderSerializer, OrderCreateSerializer
from menu.models import FoodItem


def get_session_id(request):
    session_id = request.headers.get('X-Session-ID')
    if not session_id:
        session_id = request.session.session_key
    if not session_id:
        session_id = str(uuid.uuid4())
        request.session['session_id'] = session_id
        request.session.save()
    return session_id


class CartView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        if request.user.is_authenticated:
            items = CartItem.objects.filter(user=request.user)
        else:
            session_id = get_session_id(request)
            items = CartItem.objects.filter(session_id=session_id)
        serializer = CartItemSerializer(items, many=True)
        total = sum(item.total_price for item in items)
        return Response({'items': serializer.data, 'total': total})

    def post(self, request):
        food_item_id = request.data.get('food_item_id')
        quantity = int(request.data.get('quantity', 1))

        try:
            food_item = FoodItem.objects.get(id=food_item_id, is_available=True)
        except FoodItem.DoesNotExist:
            return Response({'error': 'Food item not found'}, status=status.HTTP_404_NOT_FOUND)

        if request.user.is_authenticated:
            cart_item, created = CartItem.objects.get_or_create(
                user=request.user, food_item=food_item,
                defaults={'quantity': quantity}
            )
            if not created:
                cart_item.quantity += quantity
                cart_item.save()
        else:
            session_id = get_session_id(request)
            cart_item, created = CartItem.objects.get_or_create(
                session_id=session_id, food_item=food_item,
                defaults={'quantity': quantity}
            )
            if not created:
                cart_item.quantity += quantity
                cart_item.save()

        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CartItemUpdateView(APIView):
    permission_classes = [AllowAny]

    def put(self, request, pk):
        quantity = int(request.data.get('quantity', 1))
        if quantity < 1:
            return self.delete(request, pk)

        if request.user.is_authenticated:
            try:
                item = CartItem.objects.get(pk=pk, user=request.user)
            except CartItem.DoesNotExist:
                return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            session_id = get_session_id(request)
            try:
                item = CartItem.objects.get(pk=pk, session_id=session_id)
            except CartItem.DoesNotExist:
                return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)

        item.quantity = quantity
        item.save()
        serializer = CartItemSerializer(item)
        return Response(serializer.data)

    def delete(self, request, pk):
        if request.user.is_authenticated:
            try:
                item = CartItem.objects.get(pk=pk, user=request.user)
            except CartItem.DoesNotExist:
                return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            session_id = get_session_id(request)
            try:
                item = CartItem.objects.get(pk=pk, session_id=session_id)
            except CartItem.DoesNotExist:
                return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)

        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CartClearView(APIView):
    permission_classes = [AllowAny]

    def delete(self, request):
        if request.user.is_authenticated:
            CartItem.objects.filter(user=request.user).delete()
        else:
            session_id = get_session_id(request)
            CartItem.objects.filter(session_id=session_id).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class OrderCreateView(APIView):
    permission_classes = [AllowAny]

    @transaction.atomic
    def post(self, request):
        if request.user.is_authenticated:
            cart_items = CartItem.objects.filter(user=request.user)
            user = request.user
        else:
            session_id = get_session_id(request)
            cart_items = CartItem.objects.filter(session_id=session_id)
            user = None

        if not cart_items.exists():
            return Response({'error': 'Cart is empty'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = OrderCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        total_amount = sum(item.total_price for item in cart_items)

        order = Order.objects.create(
            user=user,
            status='pending',
            total_amount=total_amount,
            payment_mode=serializer.validated_data['payment_mode'],
            delivery_address=serializer.validated_data['delivery_address'],
            phone=serializer.validated_data['phone']
        )

        for cart_item in cart_items:
            OrderItem.objects.create(
                order=order,
                food_item=cart_item.food_item,
                quantity=cart_item.quantity,
                price_at_purchase=cart_item.food_item.current_price
            )

        cart_items.delete()

        order_serializer = OrderSerializer(order)
        return Response(order_serializer.data, status=status.HTTP_201_CREATED)


class OrderListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)


class OrderDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, order_id):
        try:
            order = Order.objects.get(order_id=order_id, user=request.user)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = OrderSerializer(order)
        return Response(serializer.data)


class OrderCancelView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, order_id):
        try:
            order = Order.objects.get(order_id=order_id, user=request.user)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

        if order.status not in ['pending', 'preparing']:
            return Response({'error': 'Cannot cancel this order'}, status=status.HTTP_400_BAD_REQUEST)

        order.status = 'cancelled'
        order.save()
        serializer = OrderSerializer(order)
        return Response(serializer.data)


class AdminOrderListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_admin and request.user.user_type != 'staff':
            return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)


class AdminOrderStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, order_id):
        if not request.user.is_admin and request.user.user_type != 'staff':
            return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)

        try:
            order = Order.objects.get(order_id=order_id)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

        new_status = request.data.get('status')
        if new_status not in dict(Order.STATUS_CHOICES):
            return Response({'error': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)

        order.status = new_status
        order.save()
        serializer = OrderSerializer(order)
        return Response(serializer.data)


class AdminStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_admin and request.user.user_type != 'staff':
            return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)

        from django.db.models import Count, Sum
        from django.utils import timezone
        from datetime import timedelta

        today = timezone.now()
        last_7_days = today - timedelta(days=7)

        total_orders = Order.objects.count()
        pending_orders = Order.objects.filter(status='pending').count()
        preparing_orders = Order.objects.filter(status='preparing').count()
        dispatched_orders = Order.objects.filter(status='dispatched').count()
        delivered_orders = Order.objects.filter(status='delivered').count()
        cancelled_orders = Order.objects.filter(status='cancelled').count()

        revenue_today = Order.objects.filter(
            created_at__date=today.date(),
            status__in=['delivered', 'dispatched', 'preparing']
        ).aggregate(total=Sum('total_amount'))['total'] or 0

        revenue_week = Order.objects.filter(
            created_at__gte=last_7_days,
            status__in=['delivered', 'dispatched', 'preparing']
        ).aggregate(total=Sum('total_amount'))['total'] or 0

        total_customers = User.objects.filter(user_type='customer').count()

        return Response({
            'total_orders': total_orders,
            'pending_orders': pending_orders,
            'preparing_orders': preparing_orders,
            'dispatched_orders': dispatched_orders,
            'delivered_orders': delivered_orders,
            'cancelled_orders': cancelled_orders,
            'revenue_today': revenue_today,
            'revenue_week': revenue_week,
            'total_customers': total_customers,
        })


from django.contrib.auth import get_user_model
User = get_user_model()
