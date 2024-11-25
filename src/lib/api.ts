import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (email: string, password: string) =>
  api.post('/auth/login', { email, password });

export const register = (name: string, email: string, password: string) =>
  api.post('/auth/register', { name, email, password });

export const getProducts = () => api.get('/products');

export const getProduct = (id: string) => api.get(`/products/${id}`);

export const createOrder = async (orderData: any) => {
  try {
    const response = await api.post('/orders', orderData);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data);
      throw new Error(error.response?.data?.message || 'An error occurred while creating the order');
    }
    throw error;
  }
};

export const getOrders = () => api.get('/orders/myorders');

export default api;