import axios from "@/axios/index";
import router from "@/router";

const api = axios.create();

// Перехватчик для запросов
api.interceptors.request.use(config => {
    if (localStorage.getItem('access_token')) {
        config.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`
    }
    return config;
}, error => {
    // Обработка ошибок запросов
    // return Promise.reject(error);
});

// Перехватчик для ответов
api.interceptors.response.use(response => {
    if (localStorage.getItem('access_token')) {
        response.config.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`
    }
    return response;
}, error => {
    // Обработка ошибок ответов
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

    // Обработка других ошибок
    return Promise.reject(error);
});

export default api;
