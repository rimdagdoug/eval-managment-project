<template>
  <header-page></header-page>
  <div class="container">
    <div class="main-body">
      <div class="promo_card">
        <h2>Evaluation: Enter Notes</h2>
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
                <th>Description</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(skill, index) in skills" :key="skill.id">
                <td>{{ skill.name }}</td>
                <td>{{ skill.description }}</td>
                <td>
                  <input
                    type="number"
                    v-model="notes[index].note"
                    placeholder="Note"
                    @input="validateField(index)"
                  />
                  <p v-if="errors[index]" class="my-2 text-red-800">
                    {{ errors[index] }}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <button @click="submitNotes">Submit Notes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderPage from '@/components/HeaderPage.vue';
import { ref, onMounted, watchEffect } from 'vue';
import { useEvalStore } from '@/stores/eval';
import { useRoute } from 'vue-router';
import router from '@/router';
import * as Yup from 'yup';

export default {
  components: { HeaderPage },
  name: 'AddNotePage',
  setup() {
    const evalStore = useEvalStore();
    const route = useRoute();
    const skills = ref([]);
    const notes = ref([]);
    const errors = ref({});

    onMounted(async () => {
      const id = route.params.id;
      await evalStore.fetchEvaluationById(id);
    });

    watchEffect(() => {
      const evaluation = evalStore.evaluation;
      if (evaluation) {
        skills.value = evaluation.map(item => item.skills);
        notes.value = evaluation.map(item => ({
          skillId: item.skills.id,
          note: 0,
        }));
      }
    });

    const validationSchema = Yup.number()
  .typeError('Note is required') 
  .min(0.1, 'Note must be at least 0.1')
  .max(10, 'Note cannot be more than 10');

const validateField = async (index) => {
  const note = notes.value[index].note;
  try {
    await validationSchema.validate(note);
    errors.value[index] = '';
  } catch (error) {
    errors.value[index] = error.message;
  }
};

    const submitNotes = async () => {
      let isValid = true;

      for (let i = 0; i < notes.value.length; i++) {
        await validateField(i);
        if (errors.value[i]) {
          isValid = false;
        }
      }

      if (!isValid) {
        return;
      }

      await evalStore.addNote({
        skills: notes.value,
        evaluationId: route.params.id,
      });

      if (localStorage.getItem('role') === 'RH') {
        await evalStore.getFinalScore(route.params.id);
      }

      router.push('/eval');
    };

    return {
      skills,
      notes,
      submitNotes,
      validateField,
      errors,
    };
  },
};
</script>

<style scoped>
input[type="number"] {
  width: 100%;
  padding: 10px;
  border: 2px solid #4caf50;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  transition: border-color 0.3s;
}

input[type="number"]:focus {
  border-color: #2e7d32;
  outline: none;
}

.list1, table {
  width: 100%;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  background-color: #45a049;
}

button:active {
  transform: scale(0.95);
}

.my-2 {
  margin-top: 0.5rem !important;
  margin-bottom: 0.5rem !important;
}

.text-red-800 {
  color: #fb0101 !important;
}
</style>
