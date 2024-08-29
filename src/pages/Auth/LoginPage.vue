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
          <input 
            id="email" 
            v-model="email" 
            @blur="validateField('email')" 
            type="email" 
            name="email" 
            placeholder="Username@gmail.com"
          />
          <p v-if="errors.email" class="my-2 text-red-800">{{ errors.email }}</p>
        </div>
      </div>

      <!-- Champ Password -->
      <div class="password">
        <label for="password">Password</label>
        <div class="sec-2">
          <ion-icon name="lock-closed-outline"></ion-icon>
          <input 
            id="password" 
            v-model="password" 
            @blur="validateField('password')" 
            type="password" 
            name="password" 
            placeholder="············" 
          />
          <ion-icon class="show-hide" name="eye-outline"></ion-icon>
          <p v-if="errors.password" class="my-2 text-red-800">{{ errors.password }}</p>
        </div>
      </div>

      <!-- Bouton Login -->
      <button class="login" @click.prevent="login">Login</button>
    </div>
  </div>
</template>

<script>
import { useField, useForm } from 'vee-validate';
import * as Yup from 'yup';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    // Schema de validation avec Yup
    const validationSchema = Yup.object().shape({
      email: Yup.string().email('Please enter a valid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
    });

    // Utilisation de vee-validate pour les champs
    const { handleSubmit, errors } = useForm({ validationSchema });
    const { value: email, validate: validateEmail } = useField('email');
    const { value: password, validate: validatePassword } = useField('password');

    // Fonction de validation de champ sur blur
    const validateField = async (field) => {
      switch (field) {
        case 'email':
          await validateEmail();
          break;
        case 'password':
          await validatePassword();
          break;
      }
    };

    // Soumission du formulaire
    const login = handleSubmit(async () => {
      try {
        const response = await authStore.login(email.value, password.value);
        if (authStore.isAuthenticated) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('firstname', response.firstname);
          localStorage.setItem('lastname', response.lastname);
          localStorage.setItem('role', response.role);
          router.push('/eval');
        }
      } catch (error) {
        console.error('Erreur lors de la connexion', error);
      }
    });

    return {
      email,
      password,
      errors,
      validateField,
      login,
    };
  },
};
</script>

<style scoped lang="scss">
/* Styles similaires à votre code existant */
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
.my-2 {
  margin-top: 0.5rem !important;
  margin-bottom: 0.5rem !important;
}

.text-red-800 {
  color: #9b2c2c !important;
}
</style>
