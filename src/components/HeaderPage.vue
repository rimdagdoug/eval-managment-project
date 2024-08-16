<template>
  <header class="header">
    <div class="logo">
      <img src="@/assets/logo.png" alt="Logo" class="logo-image" /> <!-- Ajoutez l'image ici -->
      <a href="#">Elyos Digital</a>
      <div class="search_box">
        <input type="text" placeholder="Search ">
        <i class="fa-sharp fa-solid fa-magnifying-glass"></i>
      </div>
    </div>

    <div class="header-icons">
      <i class="fas fa-bell"></i>
      <div class="account">
        <h4>{{ user?.firstname }} {{ user?.lastname }}</h4>
      </div>
    </div>
  </header>
</template>

<script>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';

export default {
  setup() {
    const authStore = useAuthStore();
    const user = computed(() => authStore.user);

    return {
      user,
    };
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between; /* Espace entre le logo et les icônes */
  align-items: center; /* Aligne les éléments au centre */
}

.logo {
  display: flex;
  align-items: center; /* Aligne le logo et le titre au centre */
}

.logo-image {
  width: 40px; /* Ajustez la taille de l'image */
  height: auto; /* Conserve le ratio de l'image */
  margin-right: 10px; /* Espace entre l'image et le titre */
}

.header-icons {
  display: flex;
  align-items: center; /* Aligne les icônes au centre */
}
</style>