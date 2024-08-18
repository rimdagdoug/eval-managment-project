import { defineStore } from 'pinia';
import api from '../utils/api'; 

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: localStorage.getItem('user') 
      ? JSON.parse(localStorage.getItem('user')) 
      : null,
    token: localStorage.getItem('token') || null,
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await api.post('/auth/authenticate', {
          email,
          password,
        });
        if (response.data) {
          this.token = response.data.token;
          this.user = {
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            role: response.data.role,
          };
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(this.user));
          return response.data;
        } else {
          throw new Error('Réponse invalide');
        }
      } catch (error) {
        console.error('Échec de la connexion', error);
        throw error;
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('firstname');
      localStorage.removeItem('lastname');
      localStorage.removeItem('role');
    }, 
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
});
