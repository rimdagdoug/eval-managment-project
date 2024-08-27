<template>
  <header-page></header-page>
  <div class="container flex-start">
    <div class="nav-bar-flex">
    <navbar-page></navbar-page>
  </div>
    <div class="main-body">
      <h2>Skills</h2>
      <div class="promo_card">
        <button @click="addSkill">Add Skill</button>
      </div>
      <div class="history_lists">
        <div class="list1">
          <div class="row">
            <h4>History</h4>
            <a href="#">See all</a>
          </div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Skill Type</th>
                <th>Coefficient</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(skill, index) in skills" :key="skill.id">
                <td>{{ index + 1 }}</td>
                <td>{{ skill.name }}</td>
                <td>{{ skill.description }}</td>
                <td>{{ skill.skillType }}</td>
                <td>{{ skill.coefficient }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarPage from '@/components/SideNavbarPage.vue';
import HeaderPage from '@/components/HeaderPage.vue';
import { onMounted, ref } from 'vue';
import { useSkillsStore } from '@/stores/skills';
import './skillsPage.css';import { useRouter } from 'vue-router';
export default {
  components: { NavbarPage, HeaderPage },
  name: 'SkillPage',
  setup() {
    const skillsStore = useSkillsStore();
    const skills = ref([]);
    const router = useRouter();

    onMounted(async () => {
      await skillsStore.fetchSkills();
      skills.value = skillsStore.skills; 
    });

    const addSkill = () => {
      router.push('/add-skill');
    };

    return {
      skills,
      addSkill,
    };
  },
};
</script>

