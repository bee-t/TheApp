import axios from 'axios';
import { AuthResponse, User } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

export const authAPI = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password
    });
    return response.data;
  },

  async signup(email: string, password: string, name: string): Promise<AuthResponse> {
    const response = await axios.post(`${API_BASE_URL}/signup`, {
      email,
      password,
      name
    });
    return response.data;
  },

  async verifyToken(token: string): Promise<{ valid: boolean }> {
    const response = await axios.get(`${API_BASE_URL}/verify`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async getCurrentUser(token: string): Promise<{ success: boolean; user?: User }> {
    const response = await axios.get(`${API_BASE_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};