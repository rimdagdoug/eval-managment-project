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
                <td>
                  <div class="status-container">
                    <div class="progress-bar" :style="getProgressStyle(evaluation.status)">
                      <span :style="getTextStyle(evaluation.status)">{{ getStatusText(evaluation.status) }}</span>
                    </div>
                  </div>
                </td>
                <td>{{ evaluation.finalNote }}</td>
                <td>
                  <div class="action-buttons">
                    <button class="add-note-btn" @click="showNote(evaluation.id)">Show Note</button>
                    <button class="add-note-btn" @click="addNote(evaluation.id)">Add Note</button>
                  </div>
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

    const getProgressStyle = (status) => {
      if (status === 'AWAITING_DEVELOPER_INPUT') {
        return { width: '100%', backgroundColor: '#FFC107' }; 
      }
      if (status === 'AWAITING_MANAGER_VALIDATION') {
        return { width: '100%', backgroundColor: '#FF9800' }; 
      }
      if (status === 'COMPLETED') {
        return { width: '100%', backgroundColor: '#4CAF50' }; 
      }
    };

    const getTextStyle = (status) => {
      if (status === 'AWAITING_DEVELOPER_INPUT' || status === 'AWAITING_MANAGER_VALIDATION') {
        return { color: 'black' }; 
      }
      if (status === 'COMPLETED') {
        return { color: 'white' }; 
      }
    };

    const getStatusText = (status) => {
      if (status === 'AWAITING_DEVELOPER_INPUT') return 'Awaiting Dev';
      if (status === 'AWAITING_MANAGER_VALIDATION') return 'Awaiting Manager';
      if (status === 'COMPLETED') return 'Completed';
    };


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

    return {
      evaluations,
      addEvall,
      showNote,
      addNote,
      getProgressStyle,
      getTextStyle,
      getStatusText,
    };
  },
};
</script>

<style scoped>
.status-container {
  display: flex;
  align-items: center;
}

.progress-bar {
  height: 25px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  transition: width 0.3s ease, background-color 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.add-note-btn {
  margin: 5px;
}
</style>
