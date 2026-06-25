import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ChefHat } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f6e9] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <ChefHat className="w-8 h-8 text-[#4c4c17]" />
            <span className="font-display text-2xl font-semibold text-[#4c4c17]">Savory & Sage</span>
          </Link>
          <h1 className="font-display text-3xl font-bold text-[#4c4c17]">Welcome Back</h1>
          <p className="mt-2 text-[#4c4c17]/60">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#4c4c17]/70 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 bg-[#f6f6e9] rounded-xl text-[#4c4c17] placeholder:text-[#4c4c17]/40 focus:ring-2 focus:ring-[#4c4c17]/20 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4c4c17]/70 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 bg-[#f6f6e9] rounded-xl text-[#4c4c17] placeholder:text-[#4c4c17]/40 focus:ring-2 focus:ring-[#4c4c17]/20 outline-none transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4c4c17]/40 hover:text-[#4c4c17]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#4c4c17] text-[#f6f6e9] rounded-xl font-medium hover:bg-[#4c4c17]/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#4c4c17]/60">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="text-[#4c4c17] font-medium hover:underline">
                Sign Up
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-[#e5e5e5]">
            <p className="text-xs text-center text-[#4c4c17]/40 mb-3">Demo Accounts</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { setEmail('admin@savorysage.com'); setPassword('admin123'); }}
                className="text-xs px-3 py-2 bg-[#f6f6e9] rounded-lg text-[#4c4c17]/70 hover:bg-[#4c4c17]/5 transition-colors"
              >
                Admin
              </button>
              <button
                onClick={() => { setEmail('customer@example.com'); setPassword('customer123'); }}
                className="text-xs px-3 py-2 bg-[#f6f6e9] rounded-lg text-[#4c4c17]/70 hover:bg-[#4c4c17]/5 transition-colors"
              >
                Customer
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
