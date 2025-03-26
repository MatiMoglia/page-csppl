import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store';

import Inicio from '../views/InicioView.vue';
import Historia from '@/components/csppl-info/Historia.vue';
import MVVObjetivos from '@/components/csppl-info/MVVObjetivos.vue';
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
import NovedadesView from '@/views/NovedadesView.vue';
import ReclamosView from '@/views/ReclamosView.vue';
import PerfilView from '@/views/PerfilView.vue';
import NecrologicosView from '@/views/NecrologicosView.vue';

import detalleSepelio from '@/components/detalleSS/DetalleSepelio.vue';
import detalleBanco from '@/components/detalleSS/DetalleBanco.vue';
import detalleTraslado from '@/components/detalleSS/DetalleTraslado.vue';
import testInt from '@/components/comp-inicio/testInt.vue';
import facturaDigital from '@/components/comp-inicio/facturaDigital.vue';

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Inicio,
    meta: { title: "Inicio | Cooperativa de Servicios Públicos de Porteña" } 
  },
  {
    path: '/historia',
    name: 'Historia',
    component: Historia,
    meta: { title: "Historia | Cooperativa de Servicios Públicos de Porteña" } 
  },
  {
    path: '/mvv-objetivos',
    name: 'MVVObjetivos',
    component: MVVObjetivos,
    meta: { title: "Objetivos | Cooperativa de Servicios Públicos de Porteña" } 
  },
  {
    path: '/autoridades',
    name: 'Autoridades',
    component: Autoridades,
    meta: { title: "Autoridades | Cooperativa de Servicios Públicos de Porteña" } 
  },
  {
    path: '/cooplus',
    name: 'CooplusView',
    component: CooplusView,
    meta: { title: "COOPLUS+ | Cooperativa de Servicios Públicos de Porteña" } 
  },
  {
    path: '/energia',
    name: 'EnergiaView',
    component: EnergiaView,
    meta: { title: "Energía Eléctrica | Cooperativa de Servicios Públicos de Porteña" } 
  },
  {
    path: '/agua',
    name: 'AguaView',
    component: AguaView,
    meta: { title: "Agua Potable | Cooperativa de Servicios Públicos de Porteña" } 
  },
  {
    path: '/telecomunicaciones',
    name: 'TelecomunicacionesView',
    component: InternetView,
    meta: { title: "Internet | Cooperativa de Servicios Públicos de Porteña" } 
  },
  {
    path: '/telefono',
    name: 'Telefonia',
    component: Telefonia,
    meta: { title: "Energía Eléctrica | Cooperativa de Servicios Públicos de Porteña" } 
  },
  {
    path: '/servicios-sociales',
    name: 'ServiciosSocialesView',
    component: ServiciosSocialesView,
    meta: { title: "Servicios Sociales | Cooperativa de Servicios Públicos de Porteña" }
  },
  {
    path: '/contacto',
    name: 'ContactoView',
    component: ContactoView,
    meta: { title: "Contacto | Cooperativa de Servicios Públicos de Porteña" }
  },
  {
    path: '/detalle-sepelio',
    name: 'DetalleSepelio',
    component: detalleSepelio,
    meta: { title: "Sepelio | Cooperativa de Servicios Públicos de Porteña" }
  },
  {
    path: '/detalle-banco',
    name: 'DetalleBanco',
    component: detalleBanco,
    meta: { title: "Banco de Sangre| Cooperativa de Servicios Públicos de Porteña" }
  },
  {
    path: '/detalle-traslado',
    name: 'DetalleTraslado',
    component: detalleTraslado,
    meta: { title: "Traslado Social | Cooperativa de Servicios Públicos de Porteña" }
  },
  {
    path: '/registro',
    name: 'RegisterView',
    component: RegisterView,
    meta: {
      hideNavbar: true,
      hideFooter: true,
      hideSpam: true,
      title: "Registro | Cooperativa de Servicios Públicos de Porteña"
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
      title: "Login | Cooperativa de Servicios Públicos de Porteña"
    }
  },
  {
    path: '/administracion',
    name: 'AdministracionView',
    component: AdministracionView,
    meta: { title: "Panel de Administracion | Cooperativa de Servicios Públicos de Porteña" },
    beforeEnter: (to, from, next) => {
      if (store.state.auth.user && store.state.auth.user.isAdmin) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/novedades',
    name: 'NovedadesView',
    component: NovedadesView,
    meta: { title: "Novedades | Cooperativa de Servicios Públicos de Porteña" }
  },
  {
    path: "/novedad/:id",
    name: "NovedadDetalle",
    meta: { title: "Detalle de la Novedad | Cooperativa de Servicios Públicos de Porteña" },
    component: () => import("@/components/NovedadDetalle.vue"),

  },
  {
    path: '/reclamos',
    name: 'ReclamosView',
    component: ReclamosView,
    meta: { title: "Reclamos | Cooperativa de Servicios Públicos de Porteña" }
  },
  {
    path: '/perfil',
    name: 'PerfilView',
    component: PerfilView,
    meta: { title: "Mi Perfil | Cooperativa de Servicios Públicos de Porteña" },
    beforeEnter: (to, from, next) => {
      if (store.state.auth.user) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/testVelocidad',
    name: 'testInt',
    component: testInt,
    meta: { title: "Test de Velocidad | Cooperativa de Servicios Públicos de Porteña" }  //, beforeEnter: (to, from, next) => { if (store.state.auth.user) { next(); } else { next('/login'); } }
  },
  {
    path: '/facturaDigital',
    name: 'FacturaDigital',
    component: facturaDigital,
    meta: { title: "Factura Digital | Cooperativa de Servicios Públicos de Porteña" }  //, beforeEnter: (to, from, next) => { if (store.state.auth.user) { next(); } else { next('/login'); } }
  },
  {
    path: '/necrologicos',
    name: 'NecrologicosView',
    component: NecrologicosView,
    meta: { title: "Necrología | Cooperativa de Servicios Públicos de Porteña" }
  }
  
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
});

export default router
