import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './auth';

export const useSkillsStore = defineStore('skills', {
  state: () => ({
    skills: [],
  }),
  actions: {
    async fetchSkills() {
        const authStore = useAuthStore();
      try {
        const response = await axios.get('http://localhost:8080/skills',{
            headers: {
                Authorization: `Bearer ${authStore.token}`, 
            }
        });
        this.skills = response.data;
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    },
  },
});
