<template>
    <div class="container">
      <div class="screen-1">
        <img class="logo" src="@/assets/logo.png" alt="Logo" />
  
        <div class="name-fields">
          <div class="firstname">
            <label for="firstname">First Name</label>
            <div class="sec-2">
              <ion-icon name="person-outline"></ion-icon>
              <input v-model="firstname" type="text" name="firstname" placeholder="First Name" required />
            </div>
          </div>
  
          <div class="lastname">
            <label for="lastname">Last Name</label>
            <div class="sec-2">
              <ion-icon name="person-outline"></ion-icon>
              <input v-model="lastname" type="text" name="lastname" placeholder="Last Name" required />
            </div>
          </div>
        </div>
  
        <div class="email">
          <label for="email">Email Address</label>
          <div class="sec-2">
            <ion-icon name="mail-outline"></ion-icon>
            <input v-model="email" type="email" name="email" placeholder="Username@gmail.com" required/>
          </div>
        </div>
  
        <div class="password">
          <label for="password">Password</label>
          <div class="sec-2">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <input v-model="password" type="password" name="password" placeholder="············" required/>
            <ion-icon class="show-hide" name="eye-outline"></ion-icon>
          </div>
        </div>
  
        <div class="role">
          <label for="role">Role</label>
          <div class="sec-2">
            <ion-icon name="briefcase-outline"></ion-icon>
            <select v-model="role" required>
              <option v-for="roleType in roleTypes" :key="roleType" :value="roleType">{{ roleType }}</option>
            </select>
          </div>
        </div>
  
        <button class="register" @click.prevent="register">Register</button>
      </div>
    </div>
  </template>
  
  <script>
  import { useAuthStore } from '@/stores/auth';
  import { useSkillsStore } from '@/stores/skills';
  
  export default {
    data() {
      return {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        role: 'DEVELOPER', // Définir DEVELOPER par défaut
      };
    },
    computed: {
      roleTypes() {
        const skillsStore = useSkillsStore();
        return skillsStore.skillTypes;
      },
    },
    methods: {
      async register() {
        const authStore = useAuthStore();
        try {
          await authStore.register(this.firstname, this.lastname, this.email, this.password, this.role);
          this.$router.push('/eval'); 
        } catch (error) {
          console.error('Erreur lors de l\'inscription', error);
        }
      },
    },
    mounted() {
      const skillsStore = useSkillsStore();
      skillsStore.fetchSkillTypes(); 
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
    height: 150vh;
  }
  
  .screen-1 {
    background: $p;
    padding: 2em;
    display: flex;
    flex-direction: column;
    border-radius: 30px;
    box-shadow: 0 0 2em hsl(231deg 62% 94%);
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
        box-shadow: 0 0 2em hsl(15, 90%, 80%);
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
            color: hsl(0deg 0% 0%);
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
      box-shadow: 0 0 2em hsl(15, 90%, 80%);
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
          color: hsl(0deg 0% 0%);
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
  </style>
  