<template>
  <header-page></header-page>
  <div class="container">
    <div class="screen-1">
      <div class="name-fields">
        <div class="firstname">
          <label for="firstname">First Name</label>
          <div class="sec-2">
            <ion-icon name="person-outline"></ion-icon>
            <input 
              v-model="firstname" 
              @blur="validateField('firstname')" 
              type="text" 
              name="firstname" 
              placeholder="First Name" 
              required 
            />
            <p v-if="errors.firstname" class="error">{{ errors.firstname }}</p>
          </div>
        </div>

        <div class="lastname">
          <label for="lastname">Last Name</label>
          <div class="sec-2">
            <ion-icon name="person-outline"></ion-icon>
            <input 
              v-model="lastname" 
              @blur="validateField('lastname')" 
              type="text" 
              name="lastname" 
              placeholder="Last Name" 
              required 
            />
            <p v-if="errors.lastname" class="error">{{ errors.lastname }}</p>
          </div>
        </div>
      </div>

      <div class="email">
        <label for="email">Email Address</label>
        <div class="sec-2">
          <ion-icon name="mail-outline"></ion-icon>
          <input 
            v-model="email" 
            @blur="validateField('email')" 
            type="email" 
            name="email" 
            placeholder="Username@gmail.com" 
            required 
          />
          <p v-if="errors.email" class="error">{{ errors.email }}</p>
        </div>
      </div>

      <div class="password">
        <label for="password">Password</label>
        <div class="sec-2">
          <ion-icon name="lock-closed-outline"></ion-icon>
          <input 
            v-model="password" 
            @blur="validateField('password')" 
            type="password" 
            name="password" 
            placeholder="············" 
            required 
          />
          <ion-icon class="show-hide" name="eye-outline"></ion-icon>
          <p v-if="errors.password" class="error">{{ errors.password }}</p>
        </div>
      </div>

      <div class="role">
        <label for="role">Role</label>
        <div class="sec-2">
          <ion-icon name="briefcase-outline"></ion-icon>
          <select 
            v-model="role" 
            @blur="validateField('role')" 
            required
          >
            <option v-for="roleType in roleTypes" :key="roleType" :value="roleType">{{ roleType }}</option>
          </select>
          <p v-if="errors.role" class="error">{{ errors.role }}</p>
        </div>
      </div>

      <button class="register" @click.prevent="register">Register</button>
    </div>
  </div>
</template>

<script>
import HeaderPage from '@/components/HeaderPage.vue';
import { useField, useForm } from 'vee-validate';
import * as Yup from 'yup';
import { useAuthStore } from '@/stores/auth';
import { useSkillsStore } from '@/stores/skills';
import { useRouter } from 'vue-router';

export default {
  components: { HeaderPage },
  setup() {
    const authStore = useAuthStore();
    const skillsStore = useSkillsStore();
    const router = useRouter();

    // Schema de validation avec Yup
    const validationSchema = Yup.object().shape({
      firstname: Yup.string().required('First Name is required'),
      lastname: Yup.string().required('Last Name is required'),
      email: Yup.string().email('Please enter a valid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
      role: Yup.string().required('Role is required'),
    });

    // Utilisation de vee-validate pour les champs
    const { handleSubmit, errors } = useForm({ validationSchema });
    const { value: firstname, validate: validateFirstname } = useField('firstname');
    const { value: lastname, validate: validateLastname } = useField('lastname');
    const { value: email, validate: validateEmail } = useField('email');
    const { value: password, validate: validatePassword } = useField('password');
    const { value: role, validate: validateRole } = useField('role');

    // Fonction de validation de champ sur blur
    const validateField = async (field) => {
      switch (field) {
        case 'firstname':
          await validateFirstname();
          break;
        case 'lastname':
          await validateLastname();
          break;
        case 'email':
          await validateEmail();
          break;
        case 'password':
          await validatePassword();
          break;
        case 'role':
          await validateRole();
          break;
      }
    };

    // Soumission du formulaire
    const register = handleSubmit(async () => {
      try {
        await authStore.register(firstname.value, lastname.value, email.value, password.value, role.value);
        router.push('/eval');
      } catch (error) {
        console.error('Erreur lors de l\'inscription', error);
      }
    });

    // Fetch des types de rôles
    skillsStore.fetchSkillTypes();

    return {
      firstname,
      lastname,
      email,
      password,
      role,
      errors,
      validateField,
      register,
      roleTypes: skillsStore.skillTypes,
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
    background: hsl(240, 6%, 97%);
  }
  
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 120vh;
  }
  
  .screen-1 {
    background: $p;
    padding: 2em;
    display: flex;
    flex-direction: column;
    border-radius: 30px;
    //box-shadow: 0 0 2em hsl(231deg 62% 94%);
    max-width: 600px;
    width: 100%;
    box-sizing: border-box;
    gap: 2em;
  
    .logo {
      margin-top: -1em;
      align-self: center;
    }
  
    .name-fields {
      display: flex;
      gap: 1em;
  
      .firstname, .lastname {
        flex: 1;
        background: hsl(0, 0%, 100%);
       // box-shadow: 0 0 2em hsl(15, 90%, 80%);
        padding: 1em;
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        border-radius: 20px;
        color: hsl(10, 66%, 72%);
  
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
      }
    }
  
    .email,
    .password,
    .role {
      background: hsl(0, 0%, 100%);
      //box-shadow: 0 0 2em hsl(15, 90%, 80%);
      padding: 1em;
      display: flex;
      flex-direction: column;
      gap: 0.5em;
      border-radius: 20px;
      color: hsl(10, 66%, 76%);
  
      input, select {
        outline: none;
        border: none;
  
        &::placeholder {
          color:  hsl(0, 0%, 70%);
          font-size: 0.9em;
        }
      }
  
      ion-icon {
        color: hsl(0deg 0% 30%);
        margin-bottom: -0.2em;
      }
    }
  
    .register {
      padding: 1em;
      background: $s;
      color: hsl(0, 0%, 100%);
      border: none;
      border-radius: 30px;
      font-weight: 600;
    }
  }
  
  button {
    cursor: pointer;
  }
  .error {
    color: red;
    font-size: 0.8em;
    margin-top: 0.2em;
  }
  </style>
  