<template>

        <nav>
          <div class="side_navbar">
            <span>Main Menu</span>
            <router-link to="/home" class="active">Dashboard</router-link>
            <router-link v-if="isRH" to="/skills">Skills</router-link>
            <router-link to="/eval">Evaluation</router-link>
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