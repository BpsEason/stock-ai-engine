import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import DashboardPage from '../views/DashboardPage.vue';
import LoginPage from '../views/LoginPage.vue';

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: DashboardPage,
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage,
        meta: { requiresAuth: false }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 全域導航守衛 (Global Navigation Guard)
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const isAuthenticated = authStore.isAuthenticated;

    if (to.meta.requiresAuth && !isAuthenticated) {
        // 如果需要登入但未登入，則導向登入頁
        next({ name: 'Login' });
    } else if (to.name === 'Login' && isAuthenticated) {
        // 如果已登入但嘗試進入登入頁，則導向儀表板
        next({ name: 'Dashboard' });
    } else {
        // 其他情況正常導航
        next();
    }
});

export default router;
