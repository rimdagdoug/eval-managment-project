import HomePage from '@/pages/Auth/HomePage.vue';
import LoginPage from '@/pages/Auth/LoginPage.vue';
import { createRouter, createWebHistory } from 'vue-router';


const routes = [
    { path: '/', redirect: '/login' },
    { path: '/home', component: HomePage},
    { path: '/login', component: LoginPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;