import { createRouter, createWebHashHistory } from 'vue-router';
import Inicio from '../views/InicioView.vue';
const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Inicio,
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
});

export default router
