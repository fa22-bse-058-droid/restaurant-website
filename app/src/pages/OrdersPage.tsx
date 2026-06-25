import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, Clock, ChefHat } from 'lucide-react';
import { api } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import Footer from '@/components/Footer';

interface Order {
  order_id: string;
  status: string;
  total_amount: string;
  payment_mode: string;
  created_at: string;
  items: Array<{
    food_item_name: string;
    quantity: number;
    price_at_purchase: string;
  }>;
}

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  preparing: 'bg-blue-100 text-blue-700',
  dispatched: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

const statusIcons: Record<string, typeof Clock> = {
  pending: Clock,
  preparing: ChefHat,
  dispatched: Package,
  delivered: Package,
  cancelled: Package,
};

export default function OrdersPage() {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await api.getOrders();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (isAuthenticated) {
      fetchOrders();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f6f6e9] pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-[#4c4c17]">Please Sign In</h1>
          <p className="mt-2 text-[#4c4c17]/60">You need to be logged in to view your orders.</p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-[#4c4c17] text-[#f6f6e9] rounded-full font-medium"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f6e9] pt-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <Link to="/" className="p-2 hover:bg-[#4c4c17]/5 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-[#4c4c17]" />
          </Link>
          <div>
            <h1 className="font-display text-3xl font-bold text-[#4c4c17]">My Orders</h1>
            <p className="text-sm text-[#4c4c17]/60">Track your orders and view history</p>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                <div className="h-4 bg-[#e5e5e5] rounded w-1/3" />
                <div className="h-3 bg-[#e5e5e5] rounded w-1/2 mt-2" />
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Package className="w-16 h-16 text-[#4c4c17]/20 mx-auto mb-4" />
            <h2 className="font-display text-2xl text-[#4c4c17]">No orders yet</h2>
            <p className="mt-2 text-[#4c4c17]/60">Start ordering delicious food!</p>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-[#4c4c17] text-[#f6f6e9] rounded-full font-medium hover:bg-[#4c4c17]/90 transition-colors"
            >
              Browse Menu
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, i) => {
              const StatusIcon = statusIcons[order.status] || Clock;
              return (
                <motion.div
                  key={order.order_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${statusColors[order.status]}`}>
                        <StatusIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-display text-lg font-semibold text-[#4c4c17]">
                          Order #{order.order_id.slice(0, 8)}
                        </p>
                        <p className="text-sm text-[#4c4c17]/60">
                          {new Date(order.created_at).toLocaleDateString()} at{' '}
                          {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <div className="mt-2 space-y-1">
                          {order.items?.map((item, idx) => (
                            <p key={idx} className="text-sm text-[#4c4c17]/70">
                              {item.food_item_name} x{item.quantity}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                      <p className="font-display text-xl font-bold text-[#4c4c17] mt-2">
                        ${order.total_amount}
                      </p>
                      <p className="text-xs text-[#4c4c17]/50 capitalize">{order.payment_mode}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
