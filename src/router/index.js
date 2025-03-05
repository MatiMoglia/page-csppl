import { createRouter, createWebHashHistory } from 'vue-router';
import Inicio from '../views/InicioView.vue';
import Historia from '@/components/csppl-info/Historia.vue';
import MVVObjetivos from '@/components/csppl-info/MVVObjetivos.vue';
import trabajoInter from '@/components/csppl-info/trabajoInter.vue';
import Autoridades from '@/components/csppl-info/Autoridades.vue';
import CooplusView from '@/views/CooplusView.vue';
import EnergiaView from '@/views/EnergiaView.vue';
const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Inicio,
  },
  {
    path: '/historia',
    name: 'Historia',
    component: Historia,
  },
  {
    path: '/mvv-objetivos',
    name: 'MVVObjetivos',
    component: MVVObjetivos,
  },
  {
    path: '/autoridades',
    name: 'Autoridades',
    component: Autoridades,
  },
  {
    path: '/trabajo-inter',
    name: 'TrabajoInter',
    component: trabajoInter,
  },
  {
    path: '/cooplus',
    name: 'CooplusView',
    component: CooplusView,
  },
  {
    path: '/energia',
    name: 'EnergiaView',
    component: EnergiaView,
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
});

export default router
