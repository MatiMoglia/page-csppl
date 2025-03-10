import { createRouter, createWebHashHistory } from 'vue-router';
import Inicio from '../views/InicioView.vue';
import Historia from '@/components/csppl-info/Historia.vue';
import MVVObjetivos from '@/components/csppl-info/MVVObjetivos.vue';
import trabajoInter from '@/components/csppl-info/trabajoInter.vue';
import Autoridades from '@/components/csppl-info/Autoridades.vue';
import CooplusView from '@/views/CooplusView.vue';
import EnergiaView from '@/views/EnergiaView.vue';
import AguaView from '@/views/AguaView.vue';
import InternetView from '@/views/InternetView.vue';
import Telefonia from '@/views/Telefonia.vue';
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
  },
  {
    path: '/agua',
    name: 'AguaView',
    component: AguaView,
  },
  {
    path: '/telecomunicaciones',
    name: 'TelecomunicacionesView',
    component: InternetView,
  },
  {
    path: '/telefono',
    name: 'Telefonia',
    component: Telefonia,
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
});

export default router
