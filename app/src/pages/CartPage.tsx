import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, CreditCard, MapPin, Phone } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { api } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import Footer from '@/components/Footer';

export default function CartPage() {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [checkoutData, setCheckoutData] = useState({
    payment_mode: 'cash',
    delivery_address: user?.primary_address || '',
    phone: user?.phone || '',
  });

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setIsCheckingOut(true);
  };

  const handlePlaceOrder = async () => {
    try {
      const result = await api.createOrder(checkoutData);
      setOrderId(result.order_id);
      setOrderPlaced(true);
      clearCart();
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#f6f6e9] pt-24 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center px-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>
          <h1 className="font-display text-4xl font-bold text-[#4c4c17]">Order Placed!</h1>
          <p className="mt-4 text-[#4c4c17]/60">
            Your order <span className="font-mono text-[#4c4c17]">#{orderId.slice(0, 8)}</span> has been received.
          </p>
          <p className="mt-2 text-[#4c4c17]/60">We&apos;ll start preparing it right away!</p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#4c4c17] text-[#f6f6e9] rounded-full font-medium hover:bg-[#4c4c17]/90 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Menu
            </Link>
            <Link
              to="/orders"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#4c4c17] text-[#4c4c17] rounded-full font-medium hover:bg-[#4c4c17]/5 transition-colors"
            >
              View Orders
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f6e9] pt-24">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <Link to="/menu" className="p-2 hover:bg-[#4c4c17]/5 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-[#4c4c17]" />
          </Link>
          <h1 className="font-display text-3xl font-bold text-[#4c4c17]">Your Cart</h1>
        </motion.div>

        {items.length === 0 && !isCheckingOut ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <ShoppingBag className="w-16 h-16 text-[#4c4c17]/20 mx-auto mb-4" />
            <h2 className="font-display text-2xl text-[#4c4c17]">Your cart is empty</h2>
            <p className="mt-2 text-[#4c4c17]/60">Add some delicious items from our menu!</p>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-[#4c4c17] text-[#f6f6e9] rounded-full font-medium hover:bg-[#4c4c17]/90 transition-colors"
            >
              Browse Menu
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    className="flex gap-4 bg-white rounded-2xl p-4 mb-4 shadow-sm"
                  >
                    <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.food_item.image || '/images/img-9.jpg'}
                        alt={item.food_item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-display text-lg font-semibold text-[#4c4c17]">
                          {item.food_item.name}
                        </h3>
                        <p className="text-[#dfbfbf] font-display font-bold">
                          ${item.food_item.current_price}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 bg-[#f6f6e9] rounded-full px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center hover:bg-[#4c4c17]/10 rounded-full transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center hover:bg-[#4c4c17]/10 rounded-full transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="mt-4 text-sm text-[#4c4c17]/50 hover:text-red-500 transition-colors"
                >
                  Clear Cart
                </button>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-sm sticky top-24"
              >
                {!isCheckingOut ? (
                  <>
                    <h2 className="font-display text-xl font-semibold text-[#4c4c17]">Order Summary</h2>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#4c4c17]/60">Subtotal</span>
                        <span className="text-[#4c4c17]">${total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#4c4c17]/60">Tax</span>
                        <span className="text-[#4c4c17]">${(total * 0.0875).toFixed(2)}</span>
                      </div>
                      <div className="border-t border-[#e5e5e5] pt-2 mt-2">
                        <div className="flex justify-between">
                          <span className="font-medium text-[#4c4c17]">Total</span>
                          <span className="font-display text-xl font-bold text-[#4c4c17]">
                            ${(total * 1.0875).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCheckout}
                      className="mt-6 w-full py-4 bg-[#4c4c17] text-[#f6f6e9] rounded-xl font-medium hover:bg-[#4c4c17]/90 transition-colors"
                    >
                      {isAuthenticated ? 'Proceed to Checkout' : 'Sign In to Checkout'}
                    </motion.button>
                  </>
                ) : (
                  <>
                    <h2 className="font-display text-xl font-semibold text-[#4c4c17]">Checkout</h2>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label className="flex items-center gap-2 text-sm text-[#4c4c17]/70 mb-1">
                          <MapPin className="w-3 h-3" />
                          Delivery Address
                        </label>
                        <textarea
                          value={checkoutData.delivery_address}
                          onChange={(e) => setCheckoutData({ ...checkoutData, delivery_address: e.target.value })}
                          placeholder="Enter your delivery address"
                          className="w-full px-4 py-3 bg-[#f6f6e9] rounded-xl text-sm text-[#4c4c17] placeholder:text-[#4c4c17]/40 focus:ring-2 focus:ring-[#4c4c17]/20 outline-none resize-none"
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm text-[#4c4c17]/70 mb-1">
                          <Phone className="w-3 h-3" />
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={checkoutData.phone}
                          onChange={(e) => setCheckoutData({ ...checkoutData, phone: e.target.value })}
                          placeholder="Your phone number"
                          className="w-full px-4 py-3 bg-[#f6f6e9] rounded-xl text-sm text-[#4c4c17] placeholder:text-[#4c4c17]/40 focus:ring-2 focus:ring-[#4c4c17]/20 outline-none"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm text-[#4c4c17]/70 mb-1">
                          <CreditCard className="w-3 h-3" />
                          Payment Method
                        </label>
                        <select
                          value={checkoutData.payment_mode}
                          onChange={(e) => setCheckoutData({ ...checkoutData, payment_mode: e.target.value })}
                          className="w-full px-4 py-3 bg-[#f6f6e9] rounded-xl text-sm text-[#4c4c17] focus:ring-2 focus:ring-[#4c4c17]/20 outline-none"
                        >
                          <option value="cash">Cash on Delivery</option>
                          <option value="card">Credit/Debit Card</option>
                          <option value="online">Online Payment</option>
                        </select>
                      </div>
                      <div className="border-t border-[#e5e5e5] pt-4">
                        <div className="flex justify-between">
                          <span className="font-medium text-[#4c4c17]">Total</span>
                          <span className="font-display text-xl font-bold text-[#4c4c17]">
                            ${(total * 1.0875).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setIsCheckingOut(false)}
                          className="flex-1 py-3 border border-[#4c4c17] text-[#4c4c17] rounded-xl font-medium hover:bg-[#4c4c17]/5 transition-colors"
                        >
                          Back
                        </button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handlePlaceOrder}
                          className="flex-1 py-3 bg-[#4c4c17] text-[#f6f6e9] rounded-xl font-medium hover:bg-[#4c4c17]/90 transition-colors"
                        >
                          Place Order
                        </motion.button>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
