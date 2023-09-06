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
}, error => {
    if (error.response.data.message === 'The token has been blacklisted') {
        console.log('УДАЛИ ТОКЕН')
        localStorage.removeItem('access_token');
    }
    if (error.response.data.message === 'Token has expired') {
        return axios.post('/auth/refresh', {}, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(res => {
            localStorage.setItem('access_token', res.data.access_token);

            error.config.headers.authorization = `Bearer ${res.data.access_token}`;

            // Повтор запроса после обновления токена
            return axios.request(error.config);
        });
    }
    if (error.response.status === 403) {
        console.log('Туда нельзя)');
        router.push({name: 'home'});
    }


    return Promise.reject(error);
});

export default api;
