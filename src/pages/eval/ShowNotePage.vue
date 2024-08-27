<template>
    <header-page></header-page>
    <div class="container flex-start">
      <navbar-page></navbar-page>
      <div class="main-body">
        <h2>Evaluation Details</h2>
        <div class="promo_card">
          <h1>Evaluation:</h1>
        </div>
  
        <div class="history_lists">
          <div class="list1">
            <table>
              <thead>
                <tr>
                  <th>Name of Skill</th>
                  <th>Note Developer</th>
                  <th>Note Manager</th>
                  <th>Final Note</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(evaluation, index) in evaluations" :key="evaluation.id">
                    <td>{{ index + 1 }}. {{ evaluation?.skills?.name }}</td>
                    <td>{{ evaluation.noteDeveloper }}</td>
                    <td>{{ evaluation.noteManager }}</td>
                    <td>{{ evaluation.finalNote }}</td>
                  </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { computed, onMounted } from 'vue';
  import NavbarPage from '@/components/SideNavbarPage.vue';
  import HeaderPage from '@/components/HeaderPage.vue';
  import { useEvalStore } from '@/stores/eval';
  import { useRoute } from 'vue-router';
  import './evalPage.css';
  
  export default {
    components: { NavbarPage, HeaderPage },
    name: 'ShowNotePage', 
    setup() {
      const evalStore = useEvalStore();
      const route = useRoute();
  
      onMounted(async () => {
        const id = route.params.id; 
        await evalStore.fetchEvaluationById(id); 
        
      });

      const evaluations = computed(() => evalStore.evaluation); 
      return {
        evaluations,
      };
    },
  };
  </script>
