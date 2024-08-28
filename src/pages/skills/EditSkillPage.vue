<template>
    <header-page></header-page>
    <div class="container">
      <div class="main-body">
        <h2 class="text-white text-center mb-4">Edit Skill</h2> <!-- Ajout de classes pour le style -->
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="updateSkill">
              <div class="mb-3">
                <label for="name" class="form-label">Name:</label>
                <input id="name" v-model="skill.name" required class="form-control" />
              </div>
  
              <div class="mb-3">
                <label for="description" class="form-label">Description:</label>
                <textarea id="description" v-model="skill.description" required class="form-control"></textarea>
              </div>
  
              <div class="mb-3">
                <label for="skillType" class="form-label">Skill Type:</label>
                <select id="skillType" v-model="skill.skillType" required class="form-select">
                  <option v-for="type in skillTypes" :key="type" :value="type">{{ type }}</option>
                </select>
              </div>
  
              <div class="mb-3">
                <label for="coefficient" class="form-label">Coefficient:</label>
                <input id="coefficient" type="number" step="0.01" v-model="skill.coefficient" required class="form-control" />
              </div>
  
              <button type="submit" class="btn">Submit</button> 
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { computed, onMounted } from 'vue';
  import HeaderPage from '@/components/HeaderPage.vue';
  import { useSkillsStore } from '@/stores/skills';
  import { useRoute, useRouter } from 'vue-router';
  import './skillsManagement.css';
  
  export default {
    components: {HeaderPage },
    name: 'EditSkillPage',
    setup() {
      const skillsStore = useSkillsStore();
      const route = useRoute();
      const router = useRouter();
    
      onMounted(async () => {
        await skillsStore.fetchSkillTypes();
        const skillId = route.params.id;
        await skillsStore.fetchSkillById(skillId);
    });
  
    
      const updateSkill = async () => {
        await skillsStore.editSkill(skill.value);
        router.push('/skills'); 
    };

      const skillTypes = computed(() => skillsStore.skillTypes);  
      const skill = computed(() => skillsStore.skillData);  

      return {
        skill,
        skillTypes,
        updateSkill,
      };
    },
  };
  </script>
  