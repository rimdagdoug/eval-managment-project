<template>
    <header-page></header-page>
    <div class="container">
      <div class="main-body">
        <div class="promo_card">
          <h2>Evaluation:</h2>
        </div>
  
        <div class="history_lists">
          <div class="list1">
            <div class="row">
              <h4></h4>
            </div>
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
  import HeaderPage from '@/components/HeaderPage.vue';
  import { useEvalStore } from '@/stores/eval';
  import { useRoute } from 'vue-router';
  import './evalPage.css';
  
  export default {
    components: { HeaderPage },
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
