// App.tsx
import { Routes, Route, useLocation } from 'react-router';
import Navigation from '@/components/Navigation';
import { CartProvider } from '@/hooks/useCart';
import Home from '@/pages/Home';
import MenuPage from '@/pages/MenuPage';
import CartPage from '@/pages/CartPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import OrdersPage from '@/pages/OrdersPage';
import AdminDashboard from '@/pages/AdminDashboard';
import AboutPage from '@/pages/AboutPage';
import ReservationsPage from '@/pages/ReservationsPage';

function AppLayout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <Navigation />
      <main className={!isHome ? 'pt-20' : ''}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppLayout />
    </CartProvider>
  );
}