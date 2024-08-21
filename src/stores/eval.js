import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './auth';


export const useEvalStore = defineStore('eval', {
  state: () => ({
    managers: [],
    developers: [],
  }),
  actions: {
    async fetchManagers() {
      const authStore = useAuthStore();
      try {
        const response = await axios.get('http://localhost:8080/api/auth/managers', {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        // Récupérer uniquement le prénom et le nom
        this.managers = response.data.map(manager => ({
          id: manager.id,
          name: `${manager.firstname} ${manager.lastname}`, // Combine le prénom et le nom
        }));
      } catch (error) {
        console.error('Error fetching managers:', error.response ? error.response.data : error.message);
      }
    },
    async fetchDevelopers() {
      const authStore = useAuthStore();
      try {
        const response = await axios.get('http://localhost:8080/api/auth/developers', {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        // Récupérer uniquement le prénom et le nom
        this.developers = response.data.map(developer => ({
          id: developer.id,
          name: `${developer.firstname} ${developer.lastname}`, // Combine le prénom et le nom
        }));
      } catch (error) {
        console.error('Error fetching developers:', error.response ? error.response.data : error.message);
      }
    },
    async addEvaluation(evalData) {
        const authStore = useAuthStore();
        try {
          const response = await axios.post('http://localhost:8080/evaluations', evalData, {
            headers: {
              Authorization: `Bearer ${authStore.token}`,
            },
          });
          console.log('Evaluation added:', response.data);
          // Vous pouvez également gérer la réponse ici si nécessaire
        } catch (error) {
          console.error('Error adding evaluation:', error.response ? error.response.data : error.message);
        }
      },
    },
    
  },
);