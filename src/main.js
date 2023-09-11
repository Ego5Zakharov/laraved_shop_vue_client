import { createApp } from 'vue';
import App from './App.vue';
import './assets/style.css';
import router from './router';
import store from "@/store";
import 'flowbite/dist/flowbite.css'; // Подключение стилей Flowbite
import 'flowbite/dist/flowbite.js';  // Подключение скриптов Flowbite


const app = createApp(App);

app.use(store);
app.use(router);

app.mount('#app');
