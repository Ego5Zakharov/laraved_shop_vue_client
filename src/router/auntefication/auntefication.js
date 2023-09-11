const aunteficationRoutes = [
    {
        path: '/login',
        name: 'auth.login',
        component: () => import('../../views/Auth/Login/Login.vue')
    },
    {
        path: '/register',
        name: 'auth.register',
        component: () => import('../../views/Auth/Register/Register.vue')
    },
];

export default aunteficationRoutes;