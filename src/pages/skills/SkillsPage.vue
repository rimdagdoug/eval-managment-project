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
                    <button class="delete-button" @click="showDeleteConfirmation(skill)">Delete</button>
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

    <teleport to="body">
      <div v-if="showConfirmation" class="confirmation-modal">
        <div class="confirmation-content">
          <h3>Confirm Deletion</h3>
          <p>Are you sure you want to delete the skill "{{ skillToDelete.name }}"?</p>
          <div class="confirmation-buttons">
            <button @click="confirmDelete">Yes</button>
            <button @click="closeConfirmation">No</button>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
import NavbarPage from '@/components/SideNavbarPage.vue';
import HeaderPage from '@/components/HeaderPage.vue';
import { onMounted, ref, computed } from 'vue';
import { useSkillsStore } from '@/stores/skills';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import './skillsPage.css';

export default {
  components: { NavbarPage, HeaderPage },
  name: 'SkillPage',
  setup() {
    const skillsStore = useSkillsStore();
    const skills = ref([]);
    const router = useRouter();
    
    const currentPage = ref(1);
    const itemsPerPage = 5;
    const showConfirmation = ref(false);
    const skillToDelete = ref(null);

    onMounted(async () => {
      await skillsStore.fetchSkills();
      skills.value = skillsStore.skills; 
    });

    const paginatedSkills = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      return skills.value.slice(start, start + itemsPerPage);
    });

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

    const showDeleteConfirmation = (skill) => {
      skillToDelete.value = skill;
      showConfirmation.value = true;
    };

    const confirmDelete = async () => {
      try {
        await skillsStore.deleteSkill(skillToDelete.value.id);
        closeConfirmation();
        await skillsStore.fetchSkills();
        toast.success('Skill deleted successfully!'); // Affichage du toast de succès
      } catch (error) {
        closeConfirmation();
        if (error.response && error.response.status === 500) {
          toast.error('Deletion of this skill is not possible as it is linked to other evaluations.');
        } else {
          toast.error('An error occurred while trying to delete the skill.');
        }
      }
    };

    const closeConfirmation = () => {
      showConfirmation.value = false;
      skillToDelete.value = null;
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
      showDeleteConfirmation,
      confirmDelete,
      closeConfirmation,
      showConfirmation,
      skillToDelete,
    };
  },
};
</script>

<style>
.confirmation-modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.confirmation-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

.confirmation-buttons button {
  margin: 0 10px;
}
</style>