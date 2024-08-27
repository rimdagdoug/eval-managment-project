<template>
  <header-page></header-page>
  <div class="container flex-start">
    <div class="nav-bar-flex">
    <navbar-page></navbar-page>
  </div>
    <div class="main-body">
      <h2 class="text-white text-center mb-4">Add Eval</h2>
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="submitEval">
            <div class="mb-3">
              <label for="manager" class="form-label">Select Manager:</label>
              <select id="manager" v-model="selectedManager" required class="form-select">
                <option v-for="manager in managers" :key="manager.id" :value="manager.id">
                  {{ manager.name }}
                </option>
              </select>
            </div>

            <div class="mb-3">
              <label for="developer" class="form-label">Select Developer:</label>
              <select id="developer" v-model="selectedDeveloper" required class="form-select">
                <option v-for="developer in developers" :key="developer.id" :value="developer.id">
                  {{ developer.name }}
                </option>
              </select>
            </div>

            <button type="submit" class="btn">Add Eval</button>
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
import { useEvalStore } from '@/stores/eval'; 
import './addPage.css';
import { useRouter } from 'vue-router';

export default {
  components: { NavbarPage, HeaderPage },
  name: 'AddEvalPage',
  setup() {
    const evalStore = useEvalStore(); 
    const selectedManager = ref('');
    const selectedDeveloper = ref('');
    const router = useRouter
    
    ();
    
    onMounted(async () => {
      await evalStore.fetchManagers(); // Récupérez les managers
      await evalStore.fetchDevelopers(); // Récupérez les développeurs
    });

    const submitEval = async () => {
      try {
        // Préparez le corps de la requête
        const evalData = {
          developerId: selectedDeveloper.value,
          managerId: selectedManager.value,
          statut: "AWAITING_DEVELOPER_INPUT",
        };

        // Envoyez la requête POST à l'API
        await evalStore.addEvaluation(evalData);

        // Redirigez vers la page des évaluations après l'ajout
        router.push('/eval');
      } catch (error) {
        console.error('Error adding evaluation:', error);
      }
    };

    const managers = computed(() => evalStore.managers);
    const developers = computed(() => evalStore.developers);
    
    return {
      selectedManager,
      selectedDeveloper,
      managers,
      developers,
      submitEval,
    };
  },
};
</script>
