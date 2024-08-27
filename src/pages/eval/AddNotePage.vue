<template>
  <header-page></header-page>
  <div class="container flex-start">
    <div class="nav-bar-flex">
      <navbar-page></navbar-page>
    </div>
    <div class="main-body">
      <div class="promo_card">
        <h1>Evaluation: Enter Notes        </h1>
      </div>

      <div class="history_lists">
        <div class="list1">
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
                  <input type="number" v-model="notes[index].note" min="0" max="10" placeholder="Note" />
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
  import NavbarPage from '@/components/SideNavbarPage.vue';
  import HeaderPage from '@/components/HeaderPage.vue';
  import { ref, onMounted, watchEffect } from 'vue';
  import { useEvalStore } from '@/stores/eval';
  import { useRoute } from 'vue-router';
import router from '@/router';
  
  export default {
    components: { NavbarPage, HeaderPage },
    name: 'AddNotePage',
    setup() {
      const evalStore = useEvalStore();
      const route = useRoute();
      // const router = useRouter();
      const skills = ref([]);
      const notes = ref([]);

      onMounted(async () => {
        const id = route.params.id; 
        await evalStore.fetchEvaluationById(id); 

      });

      watchEffect(() => {
      const evaluation = evalStore.evaluation;
      if (evaluation ) {
      skills.value = evaluation.map(item => item.skills); 
      notes.value = evaluation.map(item => ({
        skillId: item.skills.id,
         note: 0, 
       }));

     }

    });


      const submitNotes = async () => {
        await evalStore.addNote({
        skills: notes.value,
        evaluationId: route.params.id,
      });
        router.push('/eval'); 
    };
  
      return {
        skills,
        notes,
        submitNotes,
      };
    },
  };
  </script>
  
  <style scoped>
  input[type="number"] {
    width: 100%; /* Largeur à 100% */
    padding: 10px; /* Ajoute un peu d'espace à l'intérieur */
    border: 2px solid #4CAF50; /* Bordure verte */
    border-radius: 5px; /* Coins arrondis */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Ombre légère */
    font-size: 16px; /* Taille de police */
    transition: border-color 0.3s; /* Transition pour le changement de couleur */
  }
  
  input[type="number"]:focus {
    border-color: #2E7D32; /* Couleur de bordure lors du focus */
    outline: none; /* Supprime le contour par défaut */
  }
  .list1 , table{
    width :100%;
  }
  button {
    background-color: #4CAF50; /* Couleur de fond verte */
    color: white; /* Couleur du texte */
    padding: 10px 20px; /* Espacement interne */
    border: none; /* Supprime la bordure par défaut */
    border-radius: 5px; /* Coins arrondis */
    font-size: 16px; /* Taille de police */
    cursor: pointer; /* Change le curseur au survol */
    transition: background-color 0.3s, transform 0.2s; /* Transitions pour le changement de couleur et l'effet de pression */
  }
  
  button:hover {
    background-color: #45a049; /* Couleur de fond au survol */
  }
  
  button:active {
    transform: scale(0.95); /* Réduit légèrement la taille lors du clic */
  }
  </style>