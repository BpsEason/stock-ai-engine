import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router'; // 導入路由配置
import './style.css';

const app = createApp(App);

app.use(createPinia());
app.use(router); // 啟用 Vue Router

app.mount('#app');
