const categoriesRoutes = [
    {
        path: '/admin/categories/index',
        name: 'admin.categories.index',
        component: () => import('../../views/Admin/Categories/Index.vue'),
    },
    {
        path: '/admin/categories/create',
        name: 'admin.categories.create',
        component: () => import('../../views/Admin/Categories/Create.vue')
    },
    {
        path: '/admin/categories/:id/show',
        name: 'admin.categories.show',
        component: () => import('../../views/Admin/Categories/Show.vue')
    },
    {
        path: '/admin/categories/:id/edit',
        name: 'admin.categories.edit',
        component: () => import('../../views/Admin/Categories/Edit.vue')
    },
];

export default categoriesRoutes;