const productsRoutes = [
    // products
    {
        path: '/admin/products/index',
        name: 'admin.products.index',
        component: () => import('../../views/Admin/Products/Index.vue')
    },
    {
        path: '/admin/products/create',
        name: 'admin.products.create',
        component: () => import('../../views/Admin/Products/Create.vue')
    },
    {
        path: '/admin/products/:id/show',
        name: 'admin.products.show',
        component: () => import('../../views/Admin/Products/Show.vue')
    },
    {
        path: '/admin/products/:id/edit',
        name: 'admin.products.edit',
        component: () => import('../../views/Admin/Products/Edit.vue')
    },
];

export default productsRoutes;