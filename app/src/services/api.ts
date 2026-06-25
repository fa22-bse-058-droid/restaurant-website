const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
import { demoCategories, demoFoodItems } from './demoData';

let useDemoData = false;

class ApiService {
  private getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || error.detail || `HTTP ${response.status}`);
    }
    return response.json();
  }

  // Auth
  async register(data: { email: string; first_name: string; last_name: string; phone?: string; password: string }) {
    const response = await fetch(`${API_BASE_URL}/auth/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await this.handleResponse(response);
    if (data.access) {
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }

  getUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  async me() {
    const response = await fetch(`${API_BASE_URL}/auth/me/`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  // Menu
  async getCategories() {
    if (useDemoData) return demoCategories;
    try {
      const response = await fetch(`${API_BASE_URL}/categories/`);
      const data = await this.handleResponse(response);
      return data;
    } catch {
      useDemoData = true;
      return demoCategories;
    }
  }

  async getCategory(slug: string) {
    if (useDemoData) {
      const cat = demoCategories.find(c => c.slug === slug);
      return { ...cat, food_items: demoFoodItems.filter(f => f.category === cat?.id) };
    }
    const response = await fetch(`${API_BASE_URL}/categories/${slug}/`);
    return this.handleResponse(response);
  }

  async getFoodItems(categorySlug?: string) {
    if (useDemoData) {
      if (categorySlug) {
        const cat = demoCategories.find(c => c.slug === categorySlug);
        return demoFoodItems.filter(f => f.category === cat?.id);
      }
      return demoFoodItems;
    }
    try {
      const url = categorySlug
        ? `${API_BASE_URL}/food-items/?category__slug=${categorySlug}`
        : `${API_BASE_URL}/food-items/`;
      const response = await fetch(url);
      const data = await this.handleResponse(response);
      return data;
    } catch {
      useDemoData = true;
      return categorySlug
        ? demoFoodItems.filter(f => f.category === demoCategories.find(c => c.slug === categorySlug)?.id)
        : demoFoodItems;
    }
  }

  async getFoodItem(id: number) {
    const response = await fetch(`${API_BASE_URL}/food-items/${id}/`);
    return this.handleResponse(response);
  }

  // Cart
  async getCart() {
    const response = await fetch(`${API_BASE_URL}/cart/`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  async addToCart(foodItemId: number, quantity: number = 1) {
    const response = await fetch(`${API_BASE_URL}/cart/add/`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ food_item_id: foodItemId, quantity }),
    });
    return this.handleResponse(response);
  }

  async updateCartItem(id: number, quantity: number) {
    const response = await fetch(`${API_BASE_URL}/cart/update/${id}/`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ quantity }),
    });
    return this.handleResponse(response);
  }

  async removeFromCart(id: number) {
    const response = await fetch(`${API_BASE_URL}/cart/remove/${id}/`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    if (response.status === 204) return null;
    return this.handleResponse(response);
  }

  async clearCart() {
    const response = await fetch(`${API_BASE_URL}/cart/clear/`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    if (response.status === 204) return null;
    return this.handleResponse(response);
  }

  // Orders
  async createOrder(data: { payment_mode: string; delivery_address: string; phone: string }) {
    const response = await fetch(`${API_BASE_URL}/orders/create/`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async getOrders() {
    const response = await fetch(`${API_BASE_URL}/orders/`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  async getOrder(orderId: string) {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  async cancelOrder(orderId: string) {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/cancel/`, {
      method: 'PATCH',
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  // Admin
  async getAdminOrders() {
    const response = await fetch(`${API_BASE_URL}/admin/orders/`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  async updateOrderStatus(orderId: string, status: string) {
    const response = await fetch(`${API_BASE_URL}/admin/orders/${orderId}/status/`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify({ status }),
    });
    return this.handleResponse(response);
  }

  async getAdminStats() {
    const response = await fetch(`${API_BASE_URL}/admin/stats/`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }
}

export const api = new ApiService();
