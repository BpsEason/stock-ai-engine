import { defineStore } from 'pinia';
import axios from 'axios';
import router from '../router';

axios.defaults.baseURL = 'http://localhost:8080/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('jwt-token') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem('jwt-token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    removeToken() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('jwt-token');
      delete axios.defaults.headers.common['Authorization'];
    },
    async login(credentials) {
      try {
        const response = await axios.post('/auth/login', credentials);
        this.setToken(response.data.access_token);
        await this.fetchUser();
        // 登入成功後，導向儀表板頁面
        router.push({ name: 'Dashboard' });
      } catch (error) {
        this.removeToken();
        throw error;
      }
    },
    async logout() {
      this.removeToken();
      // 登出後，導向登入頁面
      router.push({ name: 'Login' });
    },
    async fetchUser() {
      if (!this.token) {
        return;
      }
      try {
        const response = await axios.post('/auth/me');
        this.user = response.data;
      } catch (error) {
        this.removeToken();
        throw error;
      }
    },
  },
});
