import {createRouter, createWebHistory} from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/some',
            name: 'some',
            component: () => import('../views/Some.vue')
        },
        {
            path: '/second',
            name: 'second',
            component: () => import('../views/Second.vue')
        },
    ]
});

export default router;
