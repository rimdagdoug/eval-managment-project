import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import 'vuetify/styles';
import vuetify from './plugin/vuetify';
import { ToastContainer } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);

// Monter l'application
app.component('ToastContainer', ToastContainer);
app.mount('#app');