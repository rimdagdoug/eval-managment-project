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
              <tr v-for="(evaluation) in paginatedEvaluations" :key="evaluation.id">
                <td>{{ evaluation.manager.firstname }} {{ evaluation.manager.lastname }}</td>
                <td>{{ evaluation.developer.firstname }} {{ evaluation.developer.lastname }}</td>
                <td>
                  <div class="status-container">
                    <div class="progress-bar" :style="getProgressStyle(evaluation.status)">
                      <span :style="getTextStyle(evaluation.status)">{{ getStatusText(evaluation.status) }}</span>
                    </div>
                  </div>
                </td>
                <td class="center-div">
                  {{ evaluation.finalNote !== null && evaluation.finalNote !== undefined ? evaluation.finalNote.toFixed(2) : '-' }}
                </td>
                <td>
                  <div class="action-buttons">
                    <button class="add-note-btn" @click="showNote(evaluation.id)">Show Note</button>
                    <button
                      v-if="canAddNote(evaluation.status)"
                      class="add-note-btn"
                      @click="addNote(evaluation.id)"
                    >
                      Add Note
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import HeaderPage from '@/components/HeaderPage.vue';
import { useEvalStore } from '@/stores/eval';
import { useRouter } from 'vue-router';
import './evalPage.css';

export default {
  components: { HeaderPage },
  name: 'EvalPage',
  setup() {
    const evalStore = useEvalStore();
    const router = useRouter();
    
    const currentPage = ref(1);
    const itemsPerPage = 5;
    const role = localStorage.getItem('role'); 

    onMounted(async () => {
      await evalStore.fetchEvaluations();
    });

    const paginatedEvaluations = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      return evalStore.evaluations.slice(start, start + itemsPerPage);
    });

    const totalPages = computed(() => Math.ceil(evalStore.evaluations.length / itemsPerPage));

    const addEvall = () => {
      router.push('/add-eval');
    };

    const showNote = (id) => {
      router.push(`/show-note/${id}`);
    };

    const addNote = (id) => {
      router.push(`/add-note/${id}`);
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const canAddNote = (status) => {
      if (role === 'DEVELOPER' && status === 'AWAITING_DEVELOPER_INPUT') {
        return true;
      }
      if (role === 'MANAGER' && status === 'AWAITING_MANAGER_VALIDATION') {
        return true;
      }
      if (role === 'RH' && status === 'AWAITING_HR_APPROVAL') {
        return true;
      }
      return false;
    };

    const getProgressStyle = (status) => {
      if (status === 'AWAITING_DEVELOPER_INPUT') {
        return { width: '100%', backgroundColor: '#fb0101' };
      }
      if (status === 'AWAITING_MANAGER_VALIDATION') {
        return { width: '100%', backgroundColor: '#FFC107' };
      }
      if (status === 'AWAITING_HR_APPROVAL') {
        return { width: '100%', backgroundColor: '#FF9800' };
      }
      if (status === 'COMPLETED') {
        return { width: '100%', backgroundColor: '#4CAF50' };
      }
    };

    const getTextStyle = (status) => {
      if (['AWAITING_DEVELOPER_INPUT', 'AWAITING_MANAGER_VALIDATION', 'AWAITING_HR_APPROVAL'].includes(status)) {
        return { color: 'black' };
      }
      if (status === 'COMPLETED') {
        return { color: 'white' };
      }
    };

    const getStatusText = (status) => {
      if (status === 'AWAITING_DEVELOPER_INPUT') return 'Awaiting Dev';
      if (status === 'AWAITING_MANAGER_VALIDATION') return 'Awaiting Manager';
      if (status === 'AWAITING_HR_APPROVAL') return 'Awaiting HR';
      if (status === 'COMPLETED') return 'Completed';
    };

    return {
      paginatedEvaluations,
      currentPage,
      totalPages,
      nextPage,
      prevPage,
      addEvall,
      showNote,
      addNote,
      getProgressStyle,
      getTextStyle,
      getStatusText,
      canAddNote, 
    };
  },
};
</script>
