import {createRouter, createWebHistory} from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/admin/categories',
            name: 'admin.categories.index',
            component: () => import('../views/Admin/Categories/Index.vue')
        },
        {
            path: '/admin/categories',
            name: 'admin.categories.create',
            component: () => import('../views/Admin/Categories/Create.vue')
        },

    ]
});

export default router;
