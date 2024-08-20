import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './auth';

export const useSkillsStore = defineStore('skills', {
  state: () => ({
    skills: [],
    skillTypes: [], // État pour stocker les types de compétences
  }),
  actions: {
    async fetchSkills() {
      const authStore = useAuthStore();
      try {
        const response = await axios.get('http://localhost:8080/skills', {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        this.skills = response.data;
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    },
    async fetchSkillTypes() {
      const authStore = useAuthStore();
      try {
        const response = await axios.get('http://localhost:8080/roles', {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        this.skillTypes = response.data; // Stockez les types de compétences
      } catch (error) {
        console.error('Error fetching skill types:', error.response ? error.response.data : error.message);
      }
    },
    async addSkill(skillData) {
      const authStore = useAuthStore();
      try {
        const response = await axios.post('http://localhost:8080/skills', skillData, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        this.skills.push(response.data); // Ajoutez la nouvelle compétence à l'état
      } catch (error) {
        console.error('Error adding skill:', error.response ? error.response.data : error.message);
      }
    },
  },
});