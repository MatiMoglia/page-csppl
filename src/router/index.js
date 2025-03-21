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
import ServiciosSocialesView from '@/views/ServiciosSocialesView.vue';
import ContactoView from '@/views/ContactoView.vue';
import RegisterView from '@/views/RegisterView.vue';
import LoginView from '@/views/LoginView.vue';
import AdministracionView from '@/views/AdministracionView.vue';

import detalleSepelio from '@/components/detalleSS/DetalleSepelio.vue';
import detalleBanco from '@/components/detalleSS/DetalleBanco.vue';
import detalleTraslado from '@/components/detalleSS/DetalleTraslado.vue';

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
  },
  {
    path: '/servicios-sociales',
    name: 'ServiciosSocialesView',
    component: ServiciosSocialesView,
  },
  {
    path: '/contacto',
    name: 'ContactoView',
    component: ContactoView,
  },
  {
    path: '/detalle-sepelio',
    name: 'DetalleSepelio',
    component: detalleSepelio,
  },
  {
    path: '/detalle-banco',
    name: 'DetalleBanco',
    component: detalleBanco,
  },
  {
    path: '/detalle-traslado',
    name: 'DetalleTraslado',
    component: detalleTraslado,
  },
  {
    path: '/registro',
    name: 'RegisterView',
    component: RegisterView,
    meta: {
      hideNavbar: true,
      hideFooter: true,
      hideSpam: true,
    }
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView,
    meta: {
      hideNavbar: true,
      hideFooter: true,
      hideSpam: true,
    }
  },
  {
    path: '/administracion',
    name: 'AdministracionView',
    component: AdministracionView,
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
});

export default router
