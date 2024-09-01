import LoginPage from '@/pages/Auth/LoginPage.vue';
import RegisterPage from '@/pages/Auth/RegisterPage.vue';
import AddEvalPage from '@/pages/eval/AddEvalPage.vue';
import AddNotePage from '@/pages/eval/AddNotePage.vue';
import EvalPages from '@/pages/eval/EvalPages.vue';
import ShowNotePage from '@/pages/eval/ShowNotePage.vue';
import AddSkillPage from '@/pages/skills/AddSkillPage.vue';
import EditSkillPage from '@/pages/skills/EditSkillPage.vue';
import SkillsPage from '@/pages/skills/SkillsPage.vue';
import { useAuthStore } from '@/stores/auth';
import { createRouter, createWebHistory } from 'vue-router';


const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: LoginPage },
    {path: '/skills',component: SkillsPage},
    {path: '/eval',component: EvalPages},
    {path: '/add-skill',component: AddSkillPage },
    {path:'/add-eval', component: AddEvalPage},
    {path: '/show-note/:id',component: ShowNotePage},
    {path: '/add-note/:id',component: AddNotePage,},
    {path: '/register', component: RegisterPage},
    {
        path: '/skills/:id/edit',
        name: 'EditSkill',
        component: EditSkillPage,
      },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    
    const authRequired = [ '/skills', '/eval', '/add-skill', '/add-eval', '/show-note/:id', '/add-note/:id', '/register'];

    const role = localStorage.getItem('role');

    const restrictedRoutes = ['/add-skill', '/add-eval', '/register', '/skills'];

    if (authRequired.includes(to.path) && !authStore.isAuthenticated) {
        next('/login');
    } else if (restrictedRoutes.includes(to.path) && (role === 'DEVELOPER' || role === 'MANAGER')) {
        next('/eval');
    } else {
        next();
    }
});

export default router;