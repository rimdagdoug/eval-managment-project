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
        if (response.data) {
          this.token = response.data.token; 
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('firstname', response.data.firstname);
          localStorage.setItem('lastname', response.data.lastname);
          localStorage.setItem('role', response.data.role);
          this.user = {
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            role: response.data.role,
          };
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
      localStorage.removeItem('firstname');
      localStorage.removeItem('lastname');
      localStorage.removeItem('role');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
});