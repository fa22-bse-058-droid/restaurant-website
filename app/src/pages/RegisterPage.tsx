import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ChefHat } from 'lucide-react';
import { api } from '@/services/api';

export default function RegisterPage() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirm_password) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      await api.register({
        email: form.email,
        first_name: form.first_name,
        last_name: form.last_name,
        phone: form.phone,
        password: form.password,
      });
      navigate('/login');
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#f6f6e9] flex items-center justify-center px-6 py-24">
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
          <h1 className="font-display text-3xl font-bold text-[#4c4c17]">Create Account</h1>
          <p className="mt-2 text-[#4c4c17]/60">Join us for delicious experiences</p>
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#4c4c17]/70 mb-1">First Name</label>
                <input
                  type="text"
                  value={form.first_name}
                  onChange={(e) => updateField('first_name', e.target.value)}
                  placeholder="John"
                  required
                  className="w-full px-4 py-3 bg-[#f6f6e9] rounded-xl text-[#4c4c17] placeholder:text-[#4c4c17]/40 focus:ring-2 focus:ring-[#4c4c17]/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4c4c17]/70 mb-1">Last Name</label>
                <input
                  type="text"
                  value={form.last_name}
                  onChange={(e) => updateField('last_name', e.target.value)}
                  placeholder="Doe"
                  required
                  className="w-full px-4 py-3 bg-[#f6f6e9] rounded-xl text-[#4c4c17] placeholder:text-[#4c4c17]/40 focus:ring-2 focus:ring-[#4c4c17]/20 outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4c4c17]/70 mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 bg-[#f6f6e9] rounded-xl text-[#4c4c17] placeholder:text-[#4c4c17]/40 focus:ring-2 focus:ring-[#4c4c17]/20 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4c4c17]/70 mb-1">Phone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="(555) 123-4567"
                className="w-full px-4 py-3 bg-[#f6f6e9] rounded-xl text-[#4c4c17] placeholder:text-[#4c4c17]/40 focus:ring-2 focus:ring-[#4c4c17]/20 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4c4c17]/70 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => updateField('password', e.target.value)}
                  placeholder="Min 6 characters"
                  required
                  minLength={6}
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
            <div>
              <label className="block text-sm font-medium text-[#4c4c17]/70 mb-1">Confirm Password</label>
              <input
                type="password"
                value={form.confirm_password}
                onChange={(e) => updateField('confirm_password', e.target.value)}
                placeholder="Repeat password"
                required
                className="w-full px-4 py-3 bg-[#f6f6e9] rounded-xl text-[#4c4c17] placeholder:text-[#4c4c17]/40 focus:ring-2 focus:ring-[#4c4c17]/20 outline-none transition-all"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#4c4c17] text-[#f6f6e9] rounded-xl font-medium hover:bg-[#4c4c17]/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#4c4c17]/60">
              Already have an account?{' '}
              <Link to="/login" className="text-[#4c4c17] font-medium hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
