const usersRoutes = [
    {
        path: '/admin/users/index',
        name: 'admin.users.index',
        component: () => import('../../views/Admin/Users/Index.vue')
    },
    {
        path: '/admin/users/:id/show',
        name: 'admin.users.show',
        component: () => import('../../views/Admin/Users/Show.vue')
    },
    {
        path: '/admin/users/:id/edit',
        name: 'admin.users.edit',
        component: () => import('../../views/Admin/Users/Edit.vue')
    },
]

export default usersRoutes;