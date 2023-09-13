import {createRouter, createWebHistory} from 'vue-router';
import store from "@/store";
import rolesRoutes from "@/router/admin/roles";
import permissionsRoutes from "@/router/admin/permissions";
import usersRoutes from "@/router/admin/users";
import categoriesRoutes from "@/router/admin/categories";
import tagsRoutes from "@/router/admin/tags";
import productsRoutes from "@/router/admin/products";
import aunteficationRoutes from "@/router/auntefication/auntefication";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // roles
        ...rolesRoutes,
        // permissions
        ...permissionsRoutes,
        // users
        ...usersRoutes,
        // categories
        ...categoriesRoutes,
        // tags
        ...tagsRoutes,
        // products
        ...productsRoutes,
        // auth (login,register)
        ...aunteficationRoutes,

        {
            path: '',
            name: 'home',
            component: () => import('../views/Home/Home.vue'),
        },

        {
            path: '/search/:q?/',
            name: 'searchProducts',
            component: () => import('../views/Search/Products/SearchProducts.vue')
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

    if (accessToken) {
        try {
                await store.dispatch('getPermissionsData');
                await store.dispatch('getRolesData');
        } catch (error) {
            console.log(error);
            next();
        }
    }

    if (!accessToken && to.name === 'home') {
        return next();
    }
    if (!accessToken && to.name === 'searchProducts') {
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
