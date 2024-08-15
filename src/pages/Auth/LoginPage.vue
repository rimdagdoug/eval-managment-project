<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" required/>
        <input v-model="password" type="password" placeholder="Password" required/>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useAuthStore } from '@/stores/auth';
  import { useRouter } from 'vue-router'; // Importation de useRouter
  
  export default {
    setup() {
      const email = ref('');
      const password = ref('');
      const authStore = useAuthStore();
      const router = useRouter(); // Utilisation de useRouter pour accéder au routeur
  
      const login = async () => {
        try {
          await authStore.login(email.value, password.value);
          if (authStore.isAuthenticated) {
            // Utilisation de router pour rediriger
            router.push('/home'); // Redirection vers la page d'accueil
          }
        } catch (error) {
          console.error('Erreur lors de la connexion', error);
        }
      };
  
      return {
        email,
        password,
        login,
      };
    },
  };
  </script>
  