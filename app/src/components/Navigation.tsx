import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, ChefHat } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/reservations', label: 'Reserve' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();
  const { user, logout, isAdmin } = useAuth();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navBg = isHome && !scrolled
    ? 'bg-transparent'
    : 'bg-[#f6f6e9]/95 backdrop-blur-md shadow-sm';

  const isTransparent = isHome && !scrolled;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <ChefHat className={`w-7 h-7 group-hover:rotate-12 transition-all duration-300 ${isTransparent ? 'text-white drop-shadow-lg' : 'text-[#4c4c17]'}`} />
            <span className={`font-display text-xl font-semibold tracking-tight transition-colors ${isTransparent ? 'text-white drop-shadow-lg' : 'text-[#4c4c17]'}`}>
              Savory & Sage
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                  location.pathname === link.to
                    ? isTransparent ? 'text-white drop-shadow-lg' : 'text-[#4c4c17]'
                    : isTransparent ? 'text-white/90 hover:text-white drop-shadow-lg' : 'text-[#4c4c17]/60 hover:text-[#4c4c17]'
                }`}
              >
                {link.label}
                {location.pathname === link.to && (
                  <motion.div
                    layoutId="nav-underline"
                    className={`absolute -bottom-1 left-0 right-0 h-0.5 ${isTransparent ? 'bg-white' : 'bg-[#4c4c17]'}`}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
              <ShoppingBag className={`w-5 h-5 ${isTransparent ? 'text-white drop-shadow-lg' : 'text-[#4c4c17]'}`} />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-[#4c4c17] text-[#f6f6e9] text-xs font-bold rounded-full flex items-center justify-center"
                >
                  {itemCount}
                </motion.span>
              )}
            </Link>

            {user ? (
              <div className="hidden md:flex items-center gap-3">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className={`text-sm font-medium transition-colors ${isTransparent ? 'text-white/90 hover:text-white' : 'text-[#4c4c17]/70 hover:text-[#4c4c17]'}`}
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={logout}
                  className={`text-sm font-medium transition-colors ${isTransparent ? 'text-white/90 hover:text-white' : 'text-[#4c4c17]/70 hover:text-[#4c4c17]'}`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className={`hidden md:inline-flex items-center px-5 py-2 text-sm font-medium rounded-full transition-colors ${
                  isTransparent
                    ? 'bg-white text-[#4c4c17] hover:bg-white/90'
                    : 'bg-[#4c4c17] text-[#f6f6e9] hover:bg-[#4c4c17]/90'
                }`}
              >
                Sign In
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              {isOpen
                ? <X className={`w-5 h-5 ${isTransparent ? 'text-white' : 'text-[#4c4c17]'}`} />
                : <Menu className={`w-5 h-5 ${isTransparent ? 'text-white' : 'text-[#4c4c17]'}`} />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#f6f6e9] border-t border-[#4c4c17]/10 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="block text-lg font-medium text-[#4c4c17] hover:text-[#4c4c17]/70 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setIsOpen(false)}
                      className="block text-lg font-medium text-[#4c4c17]"
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => { logout(); setIsOpen(false); }}
                    className="block text-lg font-medium text-[#4c4c17]/70"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center px-5 py-2 bg-[#4c4c17] text-[#f6f6e9] text-sm font-medium rounded-full"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}