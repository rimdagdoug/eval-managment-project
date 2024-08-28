<template>
  <header class="header">
    <div class="logo">
      <img src="@/assets/logo.png" alt="Logo" class="logo-image" />
      <router-link to="/">Elyos Digital</router-link>
    </div>

    <nav class="menu">
      <ul>
        <li v-if="isRH"><router-link to="/skills">Skills</router-link></li>
        <li><router-link to="/eval">Evaluations</router-link></li>
        <li v-if="isRH"><router-link to="/register">Users</router-link></li>
      </ul>
    </nav>

    <div class="header-icons">
      <div class="account" @click="toggleLogout">
        <h4>{{ user?.firstname }} {{ user?.lastname }}</h4>
        <div class="logout" v-if="showLogout">
          <button @click="logout">Logout</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';


export default {
  setup() {
    const authStore = useAuthStore();
    const user = computed(() => authStore.user);
    const showLogout = ref(false);
    const router = useRouter();

    const toggleLogout = () => {
      showLogout.value = !showLogout.value;
    };

    const isRH = authStore.user?.role == 'RH';
    const logout = () => {

      authStore.logout(); 
      router.push('/login');
    };

    return {
      user,
      showLogout,
      toggleLogout,
      logout,
      isRH
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

.menu {
  flex-grow: 1; /* Permet au menu de prendre l'espace disponible */
}

.menu ul {
  display: flex; /* Aligne les éléments du menu horizontalement */
  list-style-type: none; /* Supprime les puces de la liste */
  padding: 0; /* Supprime le padding par défaut */
  margin: 0; /* Supprime la marge par défaut */
}

.menu li {
  margin: 0 15px; /* Espace entre les éléments du menu */
}

.menu a {
  text-decoration: none; /* Supprime le soulignement des liens */
  color: #333; /* Couleur du texte du menu */
}

.header-icons {
  display: flex;
  align-items: center; /* Aligne les icônes au centre */
}

.account {
  position: relative; /* Permet de positionner le bouton de déconnexion */
}

.logout {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  z-index: 1;
}
</style>