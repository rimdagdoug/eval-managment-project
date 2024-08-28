<template>
  <header-page></header-page>
  <div class="container flex-start">
    <div class="nav-bar-flex">
      <navbar-page></navbar-page>
    </div>
    <div class="main-body">
      <div class="button-container">
        <button class="add-skill-button" @click="addSkill">Add Skill</button>
      </div>
      <div class="history_lists">
        <div class="list1">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Skill Type</th>
                <th>Coefficient</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(skill) in paginatedSkills" :key="skill.id">
                <td>{{ skill.name }}</td>
                <td>{{ skill.description }}</td>
                <td>{{ skill.skillType }}</td>
                <td>{{ skill.coefficient }}</td>
                <td>
                  <div class="action-buttons">
                    <button class="edit-button" @click="editSkill(skill.id)">Edit</button>
                    <button class="delete-button">Delete</button>
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
import NavbarPage from '@/components/SideNavbarPage.vue';
import HeaderPage from '@/components/HeaderPage.vue';
import { onMounted, ref, computed } from 'vue';
import { useSkillsStore } from '@/stores/skills';
import { useRouter } from 'vue-router';
import './skillsPage.css';

export default {
  components: { NavbarPage, HeaderPage },
  name: 'SkillPage',
  setup() {
    const skillsStore = useSkillsStore();
    const skills = ref([]);
    const router = useRouter();
    
    // Pagination state
    const currentPage = ref(1);
    const itemsPerPage = 5; // Adjust this value as needed

    onMounted(async () => {
      await skillsStore.fetchSkills();
      skills.value = skillsStore.skills; 
    });

    // Computed property for paginated skills
    const paginatedSkills = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      return skills.value.slice(start, start + itemsPerPage);
    });

    // Total pages
    const totalPages = computed(() => Math.ceil(skills.value.length / itemsPerPage));

    const addSkill = () => {
      router.push('/add-skill');
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

    const editSkill = (skillId) => {
      router.push(`/skills/${skillId}/edit`);
    };

    return {
      skills,
      addSkill,
      paginatedSkills,
      currentPage,
      totalPages,
      nextPage,
      prevPage,
      editSkill,
    };
  },
};
</script>