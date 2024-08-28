<template>
  <header-page></header-page>
  <div class="container">
    <div class="main-body">
      <div class="promo_card">
        <button @click="addEvall">Add Eval</button>
      </div>

      <div class="history_lists">
        <div class="list1">
          <div class="row">
            <h4></h4>
          </div>
          <table>
            <thead>
              <tr>
                <th>Manager</th>
                <th>Developer</th>
                <th>Status</th>
                <th>Final Note</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(evaluation) in evaluations" :key="evaluation.id">
                <td>{{ evaluation.manager.firstname }} {{ evaluation.manager.lastname }}</td>
                <td>{{ evaluation.developer.firstname }} {{ evaluation.developer.lastname }}</td>
                <td>{{ evaluation.status }}</td>
                <td>{{ evaluation.finalNote }}</td>
                <td>
                  <button class="add-note-btn" @click="showNote(evaluation.id)">Show Note</button>
                  <button class="add-note-btn" @click="addNote(evaluation.id)">Add Note</button>
                </td>
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
import './evalPage.css';
import { useRouter } from 'vue-router';

export default {
  components: { HeaderPage },
  name: 'EvalPage',
  setup() {
    const evalStore = useEvalStore();
    const router = useRouter();

    onMounted(async () => {
      await evalStore.fetchEvaluations();
    });

    const addEvall = () => {
      router.push('/add-eval');
    };

    const showNote = (id) => {
       router.push(`/show-note/${id}`); 
    };

    const addNote = (id) => {
  router.push(`/add-note/${id}`); 
};
    
    const evaluations = computed(() => evalStore.evaluations);
    console.log(evaluations.value);
    return {
      evaluations,
      addEvall,
      showNote,
      addNote,
    };
  },
};
</script>