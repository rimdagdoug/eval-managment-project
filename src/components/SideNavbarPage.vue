<template>
  <nav>
    <div class="side_navbar">
      <span>Main Menu</span>
      <router-link to="/home" class="active">Dashboard</router-link>
      <router-link v-if="isRH" to="/skills">Skills</router-link>
      <div class="dropdown">
        <router-link to="/eval">Evaluation</router-link>
        <ul class="dropdown-menu">
          <li><router-link to="/eval">Evaluation</router-link></li>
          <li><router-link to="/add-eval">Add Evaluation</router-link></li>
        </ul>
      </div>
      <a v-if="isRH" href="#">User</a>
      <a href="#" @click.prevent="logout">Logout</a>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const logout = () => {
      authStore.logout();
      router.push('/login');
    };

    const isRH = authStore.user?.role == 'RH';

    return {
      logout,
      isRH
    };
  }
}
</script>

<style scoped>
/* Ajoutez les styles CSS ici */
.dropdown {
  position: relative;
}

.dropdown-menu {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-menu li {
  padding: 12px 16px;
  border-bottom: 1px solid #ddd;
}

.dropdown-menu li:last-child {
  border-bottom: none;
}

.dropdown-menu li a {
  color: #333;
  text-decoration: none;
}

.dropdown:hover .dropdown-menu {
  display: block;
}
</style>