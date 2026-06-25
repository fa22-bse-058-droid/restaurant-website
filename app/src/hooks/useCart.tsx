import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { api } from '@/services/api';

export interface CartItem {
  id: number;
  food_item: {
    id: number;
    name: string;
    price: number;
    discount_price: number | null;
    current_price: number;
    image: string | null;
  };
  quantity: number;
  total_price: number;
}

interface CartContextType {
  items: CartItem[];
  total: number;
  itemCount: number;
  isLoading: boolean;
  addToCart: (foodItemId: number, quantity?: number) => Promise<void>;
  updateQuantity: (id: number, quantity: number) => Promise<void>;
  removeItem: (id: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const refreshCart = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await api.getCart();
      setItems(data.items || []);
      setTotal(data.total || 0);
    } catch {
      setItems([]);
      setTotal(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addToCart = useCallback(async (foodItemId: number, quantity: number = 1) => {
    await api.addToCart(foodItemId, quantity);
    await refreshCart();
  }, [refreshCart]);

  const updateQuantity = useCallback(async (id: number, quantity: number) => {
    if (quantity <= 0) {
      await removeItem(id);
      return;
    }
    await api.updateCartItem(id, quantity);
    await refreshCart();
  }, [refreshCart]);

  const removeItem = useCallback(async (id: number) => {
    await api.removeFromCart(id);
    await refreshCart();
  }, [refreshCart]);

  const clearCart = useCallback(async () => {
    await api.clearCart();
    await refreshCart();
  }, [refreshCart]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, total, itemCount, isLoading,
      addToCart, updateQuantity, removeItem, clearCart, refreshCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
