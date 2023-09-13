import axios from "@/axios/index";
import router from "@/router";

const api = axios.create();

api.interceptors.request.use(config => {
    if (localStorage.getItem('access_token')) {
        config.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`
    }
    return config;
}, error => {
    return Promise.reject(error);
});

api.interceptors.response.use(response => {
    if (localStorage.getItem('access_token')) {
        response.config.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`
    }
    return response;
}, async error => {
    if (error.response.data.message === 'The token has been blacklisted') {
        console.log('The token has been blacklisted');
        localStorage.removeItem('access_token');
        console.log('The token has been deleted');

        router.push({name: 'login'});
    }
    if (error.response.data.message === 'Token has expired') {
        try {
            const response = await axios.post('/auth/refresh', {}, {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            localStorage.setItem('access_token', response.data.access_token);
            error.config.headers.authorization = `Bearer ${response.data.access_token}`;

            return axios.request(error.config);
        } catch (refreshError) {

            console.error('Ошибка при обновлении токена:', refreshError);
            localStorage.removeItem('access_token');
            router.push({name: 'login'});
        }
    }
    if (error.response.status === 403) {
        console.log('Туда нельзя)');
        router.push({name: 'home'});
    }
    return Promise.reject(error);
});

export default api;
