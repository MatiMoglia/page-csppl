import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/global.css';
import 'animate.css';
import Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const app = createApp(App);
router.beforeEach((to, from, next) => {
    document.title = to.meta.title || "Cooperativa de Servicios Públicos de Porteña";  
    next();
  });
app.use(Toastify);
app.use(store);
app.use(router);
app.mount('#app');