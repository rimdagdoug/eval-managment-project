import { defineStore } from 'pinia';
import api from '../utils/api'; 

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await api.post('/auth/authenticate', {
          email,
          password,
        });
        this.token = response.data.token;
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        this.user = {
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          role: response.data.role,
        };
      } catch (error) {
        console.error('Login Failed', error);
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
});
