import HomePage from '@/pages/Auth/HomePage.vue';
import LoginPage from '@/pages/Auth/LoginPage.vue';
import AddEvalPage from '@/pages/eval/AddEvalPage.vue';
import EvalPages from '@/pages/eval/EvalPages.vue';
import AddSkillPage from '@/pages/skills/AddSkillPage.vue';
import SkillsPage from '@/pages/skills/SkillsPage.vue';
import { useAuthStore } from '@/stores/auth';
import { createRouter, createWebHistory } from 'vue-router';


const routes = [
    { path: '/', redirect: '/login' },
    { path: '/home', component: HomePage},
    { path: '/login', component: LoginPage },
    {path: '/skills',component: SkillsPage},
    {path: '/eval',component: EvalPages},
    {path: '/add-skill',component: AddSkillPage },
    {path:'/add-eval', component: AddEvalPage}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    
    const authRequired = ['/home', '/skills', '/eval'];

    if (authRequired.includes(to.path) && !authStore.isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});

export default router;