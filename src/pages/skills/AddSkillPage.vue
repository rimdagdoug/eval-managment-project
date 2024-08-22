<template>
    <header-page></header-page>
    <div class="container flex-start">
      <navbar-page></navbar-page>
      <div class="main-body">
        <h2 class="text-white text-center mb-4">Add Skills</h2> <!-- Ajout de classes pour le style -->
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="submitSkill">
              <div class="mb-3">
                <label for="name" class="form-label">Name:</label>
                <input id="name" v-model="name" required class="form-control" />
              </div>
  
              <div class="mb-3">
                <label for="description" class="form-label">Description:</label>
                <textarea id="description" v-model="description" required class="form-control"></textarea>
              </div>
  
              <div class="mb-3">
                <label for="skillType" class="form-label">Skill Type:</label>
                <select id="skillType" v-model="skillType" required class="form-select">
                  <option v-for="type in skillTypes" :key="type" :value="type">{{ type }}</option>
                </select>
              </div>
  
              <div class="mb-3">
                <label for="coefficient" class="form-label">Coefficient:</label>
                <input id="coefficient" type="number" step="0.01" v-model="coefficient" required class="form-control" />
              </div>
  
              <button type="submit" class="btn">Add Skill</button> <!-- L'écriture du bouton est déjà en blanc -->
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, computed } from 'vue';
  import NavbarPage from '@/components/SideNavbarPage.vue';
  import HeaderPage from '@/components/HeaderPage.vue';
  import { useSkillsStore } from '@/stores/skills';
  import { useRouter } from 'vue-router';
  import './addPage.css';
  
  export default {
    components: { NavbarPage, HeaderPage },
    name: 'AddSkillPage',
    setup() {
      const skillsStore = useSkillsStore();
      const router = useRouter();
  
      const name = ref('');
      const description = ref('');
      const skillType = ref('');
      const coefficient = ref(1.0);
  
      onMounted(async () => {
        await skillsStore.fetchSkillTypes();
      });
  
      const submitSkill = async () => {
        await skillsStore.addSkill({
        name: name.value,
        description: description.value,
        skillType: skillType.value,
        coefficient: coefficient.value,
    });

    router.push('/skills'); 
    };
    const skillTypes = computed(() => skillsStore.skillTypes);  
      return {
        name,
        description,
        skillType,
        coefficient,
        skillTypes,
        submitSkill,
      };
    },
  };
  </script>
  
  