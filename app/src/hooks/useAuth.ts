import { useState, useEffect, useCallback } from 'react';
import { api } from '@/services/api';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  primary_address?: string;
  user_type: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = api.getUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const data = await api.login(email, password);
    setUser(data.user);
    return data;
  }, []);

  const register = useCallback(async (data: {
    email: string;
    first_name: string;
    last_name: string;
    phone?: string;
    password: string;
  }) => {
    const result = await api.register(data);
    return result;
  }, []);

  const logout = useCallback(() => {
    api.logout();
    setUser(null);
  }, []);

  const isAdmin = user?.user_type === 'admin' || user?.user_type === 'staff';

  return { user, isLoading, login, register, logout, isAdmin, isAuthenticated: !!user };
}
