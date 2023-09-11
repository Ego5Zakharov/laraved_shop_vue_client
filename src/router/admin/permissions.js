const permissionsRoutes = [
    {
        path: '/admin/permissions/index',
        name: 'admin.permissions.index',
        component: () => import('../../views/Admin/Permissions/Index.vue')
    },
    {
        path: '/admin/permissions/create',
        name: 'admin.permissions.create',
        component: () => import('../../views/Admin/Permissions/Create.vue')
    },
    {
        path: '/admin/permissions/:id/show',
        name: 'admin.permissions.show',
        component: () => import('../../views/Admin/Permissions/Show.vue')
    },
    {
        path: '/admin/permissions/:id/edit',
        name: 'admin.permissions.edit',
        component: () => import('../../views/Admin/Permissions/Edit.vue')
    },
]

export default permissionsRoutes;