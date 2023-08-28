import {createRouter, createWebHistory} from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/admin/categories/index',
            name: 'admin.categories.index',
            component: () => import('../views/Admin/Categories/Index.vue')
        },
        {
            path: '/admin/categories/create',
            name: 'admin.categories.create',
            component: () => import('../views/Admin/Categories/Create.vue')
        },
        {
            path: '/admin/categories/:id/show',
            name: 'admin.categories.show',
            component: () => import('../views/Admin/Categories/Show.vue')
        },
        {
            path: '/admin/categories/:id/edit',
            name: 'admin.categories.edit',
            component: () => import('../views/Admin/Categories/Edit.vue')
        },

        {
            path: '/admin/tags/index',
            name: 'admin.tags.index',
            component: () => import('../views/Admin/Tags/Index.vue')
        },
        {
            path: '/admin/tags/create',
            name: 'admin.tags.create',
            component: () => import('../views/Admin/Tags/Create.vue')
        },
        {
            path: '/admin/tags/:id/edit/',
            name: 'admin.tags.edit',
            component: () => import('../views/Admin/Tags/Edit.vue'),
        },
        {
            path: '/admin/tags/:id/show',
            name: 'admin.tags.show',
            component: () => import('../views/Admin/Tags/Show.vue')
        }
    ]
});

export default router;
