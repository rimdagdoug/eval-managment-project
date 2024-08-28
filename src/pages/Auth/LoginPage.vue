<template>
  <div class="container">
    <div class="screen-1">
      <!-- Logo Image -->
      <img class="logo" src="@/assets/logo.png" alt="Logo" />

      <!-- Champ Email -->
      <div class="email">
        <label for="email">Email Address</label>
        <div class="sec-2">
          <ion-icon name="mail-outline"></ion-icon>
          <input v-model="email" type="email" name="email" placeholder="Username@gmail.com" required/>
        </div>
      </div>

      <!-- Champ Password -->
      <div class="password">
        <label for="password">Password</label>
        <div class="sec-2">
          <ion-icon name="lock-closed-outline"></ion-icon>
          <input v-model="password" type="password" name="password" placeholder="············" required/>
          <ion-icon class="show-hide" name="eye-outline"></ion-icon>
        </div>
      </div>

      <!-- Bouton Login -->
      <button class="login" @click.prevent="login">Login</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const authStore = useAuthStore();
    const router = useRouter();

    const login = async () => {
      try {
        const response = await authStore.login(email.value, password.value);
        // Vérifiez si l'utilisateur est authentifié
        if (authStore.isAuthenticated) {
          // Stockez les informations dans localStorage
          localStorage.setItem('token', response.token); 
          localStorage.setItem('firstname', response.firstname);
          localStorage.setItem('lastname', response.lastname); 
          localStorage.setItem('role', response.role);
          router.push('/eval');
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

<style scoped lang="scss">
$p: hsl(0, 0%, 96%);
$s: hsl(27, 90%, 63%);

* {
  font-family: 'Poppins';
  box-sizing: border-box;
}

html, body {
  height: 100%;
  margin: 0;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  background: hsl(218deg 50% 91%);
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;  // Assure que le conteneur prend toute la hauteur de la page
}

.screen-1 {
  background: $p;
  padding: 2em;
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  box-shadow: 0 0 2em hsl(231deg 62% 94%);
  max-width: 400px;  // Limite la largeur maximale pour la carte
  width: 100%;
  box-sizing: border-box;
  gap: 2em;

  .logo {
    margin-top: -1em;
    align-self: center;  // Centre le logo horizontalement
  }

  .email,
  .password {
    background: hsl(0, 0%, 100%);
    //box-shadow: 0 0 2em hsl(15, 90%, 80%);
    padding: 1em;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    border-radius: 20px;
    color: hsl(10, 66%, 76%);

    input {
      outline: none;
      border: none;

      &::placeholder {
        color: hsl(0, 0%, 70%); // Couleur modifiée pour un gris clair
        font-size: 0.9em;
      }
    }

    ion-icon {
      color: hsl(0deg 0% 30%);
      margin-bottom: -0.2em;
    }

    .show-hide {
      margin-right: -5em;
    }
  }

  .login {
    padding: 1em;
    background: $s;
    color: hsl(0, 0%, 100%);
    border: none;
    border-radius: 30px;
    font-weight: 600;
  }

  .footer {
    display: flex;
    font-size: 0.7em;
    color: hsl(0deg 0% 37%);
    gap: 14em;
    padding-bottom: 10em;

    span {
      cursor: pointer;
    }
  }
}

button {
  cursor: pointer;
}
</style>