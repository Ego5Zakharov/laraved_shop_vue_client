import {createRouter, createWebHistory} from 'vue-router';
import {resolveDirective} from "vue";
import store from "@/store";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // categories
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

        // tags
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
        },

        // products
        {
            path: '/admin/products/index',
            name: 'admin.products.index',
            component: () => import('../views/Admin/Products/Index.vue')
        },
        {
            path: '/admin/products/create',
            name: 'admin.products.create',
            component: () => import('../views/Admin/Products/Create.vue')
        },
        {
            path: '/admin/products/:id/show',
            name: 'admin.products.show',
            component: () => import('../views/Admin/Products/Show.vue')
        },
        {
            path: '/admin/products/:id/edit',
            name: 'admin.products.edit',
            component: () => import('../views/Admin/Products/Edit.vue')
        },

        {
            path: '',
            name: 'home',
            component: () => import('../views/Home/Home.vue'),
        },
        // auth (login,register)
        {
            path: '/login',
            name: 'auth.login',
            component: () => import('../views/Auth/Login/Login.vue')
        },
        {
            path: '/register',
            name: 'auth.register',
            component: () => import('../views/Auth/Register/Register.vue')
        },

        {
            path: '/:catchAll(.*)',
            name: '404',
            component: () => import('../views/Home/Home.vue')
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    const accessToken = localStorage.getItem('access_token');

    // if (accessToken) {
    //     try {
    //         await store.dispatch('getPermissionsData');
    //         await store.dispatch('getRolesData');
    //     } catch (error) {
    //         console.log(error);
    //         next();
    //     }
    // }

    if (!accessToken && to.name === 'home') {
        return next();
    }

    if (!accessToken) {
        if (to.name === 'auth.login' || to.name === 'auth.register') {
            return next();
        } else {
            return next({name: 'auth.login'});
        }
    }

    if (accessToken) {
        if (to.name === 'auth.login' || to.name === 'auth.register') {
            return next({name: 'home'});
        }
    }


    next();
})

export default router;
