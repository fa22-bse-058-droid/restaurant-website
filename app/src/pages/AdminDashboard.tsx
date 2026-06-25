import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import {
  ShoppingBag, Users, DollarSign,
  Package, ChevronDown, ArrowLeft, TrendingUp, Clock, ChefHat
} from 'lucide-react';
import { api } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';

interface Order {
  order_id: string;
  user_name: string;
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

interface Stats {
  total_orders: number;
  pending_orders: number;
  preparing_orders: number;
  dispatched_orders: number;
  delivered_orders: number;
  cancelled_orders: number;
  revenue_today: number;
  revenue_week: number;
  total_customers: number;
}

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  preparing: 'bg-blue-100 text-blue-700',
  dispatched: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function AdminDashboard() {
  const { isAdmin } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersData, statsData] = await Promise.all([
          api.getAdminOrders(),
          api.getAdminStats(),
        ]);
        setOrders(ordersData);
        setStats(statsData);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      await api.updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o.order_id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#f6f6e9] pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-[#4c4c17]">Access Denied</h1>
          <p className="mt-2 text-[#4c4c17]/60">You need admin privileges to access this page.</p>
          <Link to="/" className="mt-4 inline-flex items-center gap-2 text-[#4c4c17] hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f6e9] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-[#4c4c17]/5 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-[#4c4c17]" />
            </Link>
            <div>
              <h1 className="font-display text-3xl font-bold text-[#4c4c17]">Dashboard</h1>
              <p className="text-sm text-[#4c4c17]/60">Manage orders and view analytics</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-[#4c4c17]/70">Live</span>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                <div className="h-4 bg-[#e5e5e5] rounded w-1/2" />
                <div className="h-8 bg-[#e5e5e5] rounded w-1/3 mt-2" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Orders', value: stats?.total_orders || 0, icon: ShoppingBag, color: 'bg-[#4c4c17] text-[#f6f6e9]' },
                { label: 'Revenue Today', value: `$${(stats?.revenue_today || 0).toFixed(2)}`, icon: DollarSign, color: 'bg-[#dfbfbf] text-[#4c4c17]' },
                { label: 'Pending', value: stats?.pending_orders || 0, icon: Clock, color: 'bg-amber-100 text-amber-700' },
                { label: 'Customers', value: stats?.total_customers || 0, icon: Users, color: 'bg-green-100 text-green-700' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    {stat.label === 'Revenue Today' && (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <p className="font-display text-2xl font-bold text-[#4c4c17] mt-3">{stat.value}</p>
                  <p className="text-sm text-[#4c4c17]/60">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Status Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-sm mb-8"
            >
              <h2 className="font-display text-lg font-semibold text-[#4c4c17] mb-4">Order Status Breakdown</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { label: 'Pending', value: stats?.pending_orders || 0, color: 'bg-amber-500' },
                  { label: 'Preparing', value: stats?.preparing_orders || 0, color: 'bg-blue-500' },
                  { label: 'Dispatched', value: stats?.dispatched_orders || 0, color: 'bg-purple-500' },
                  { label: 'Delivered', value: stats?.delivered_orders || 0, color: 'bg-green-500' },
                  { label: 'Cancelled', value: stats?.cancelled_orders || 0, color: 'bg-red-500' },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className={`w-3 h-3 ${s.color} rounded-full mx-auto mb-2`} />
                    <p className="font-display text-xl font-bold text-[#4c4c17]">{s.value}</p>
                    <p className="text-xs text-[#4c4c17]/60">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Orders Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              <div className="p-6 border-b border-[#e5e5e5]">
                <h2 className="font-display text-lg font-semibold text-[#4c4c17]">Recent Orders</h2>
              </div>
              <div className="divide-y divide-[#e5e5e5]">
                {orders.length === 0 ? (
                  <div className="p-8 text-center">
                    <Package className="w-12 h-12 text-[#4c4c17]/20 mx-auto mb-3" />
                    <p className="text-[#4c4c17]/60">No orders yet</p>
                  </div>
                ) : (
                  orders.map((order) => (
                    <div key={order.order_id}>
                      <div
                        onClick={() => setExpandedOrder(expandedOrder === order.order_id ? null : order.order_id)}
                        className="p-4 hover:bg-[#f6f6e9]/50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#4c4c17]/5 rounded-xl flex items-center justify-center">
                              <ChefHat className="w-5 h-5 text-[#4c4c17]" />
                            </div>
                            <div>
                              <p className="font-medium text-[#4c4c17] text-sm">
                                #{order.order_id.slice(0, 8)}
                              </p>
                              <p className="text-xs text-[#4c4c17]/60">{order.user_name}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                              {order.status}
                            </span>
                            <span className="font-display font-bold text-[#4c4c17]">${order.total_amount}</span>
                            <ChevronDown
                              className={`w-4 h-4 text-[#4c4c17]/40 transition-transform ${
                                expandedOrder === order.order_id ? 'rotate-180' : ''
                              }`}
                            />
                          </div>
                        </div>
                      </div>

                      {expandedOrder === order.order_id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="px-4 pb-4 bg-[#f6f6e9]/30"
                        >
                          <div className="pl-14">
                            <p className="text-xs text-[#4c4c17]/50 mb-2">
                              {new Date(order.created_at).toLocaleString()}
                            </p>
                            <div className="space-y-1 mb-3">
                              {order.items?.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-sm">
                                  <span className="text-[#4c4c17]/70">
                                    {item.food_item_name} x{item.quantity}
                                  </span>
                                  <span className="text-[#4c4c17]">${item.price_at_purchase}</span>
                                </div>
                              ))}
                            </div>
                            <div className="flex gap-2 flex-wrap">
                              {['pending', 'preparing', 'dispatched', 'delivered', 'cancelled'].map((status) => (
                                <button
                                  key={status}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleStatusUpdate(order.order_id, status);
                                  }}
                                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                    order.status === status
                                      ? statusColors[status]
                                      : 'bg-[#4c4c17]/5 text-[#4c4c17]/50 hover:bg-[#4c4c17]/10'
                                  }`}
                                >
                                  {status}
                                </button>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
