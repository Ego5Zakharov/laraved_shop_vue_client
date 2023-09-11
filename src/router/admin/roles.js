const rolesRoutes = [
    {
        path: '/admin/roles/index',
        name: 'admin.roles.index',
        component: () => import('../../views/Admin/Roles/Index.vue')
    },
    {
        path: '/admin/roles/create',
        name: 'admin.roles.create',
        component: () => import('../../views/Admin/Roles/Create.vue')
    },
    {
        path: '/admin/roles/:id/show',
        name: 'admin.roles.show',
        component: () => import('../../views/Admin/Roles/Show.vue')
    },
    {
        path: '/admin/roles/:id/edit',
        name: 'admin.roles.edit',
        component: () => import('../../views/Admin/Roles/Edit.vue')
    },
]

export default rolesRoutes;