const tagsRoutes = [
    {
        path: '/admin/tags/index',
        name: 'admin.tags.index',
        component: () => import('../../views/Admin/Tags/Index.vue')
    },
    {
        path: '/admin/tags/create',
        name: 'admin.tags.create',
        component: () => import('../../views/Admin/Tags/Create.vue')
    },
    {
        path: '/admin/tags/:id/edit/',
        name: 'admin.tags.edit',
        component: () => import('../../views/Admin/Tags/Edit.vue'),
    },
    {
        path: '/admin/tags/:id/show',
        name: 'admin.tags.show',
        component: () => import('../../views/Admin/Tags/Show.vue')
    },
];

export default tagsRoutes;