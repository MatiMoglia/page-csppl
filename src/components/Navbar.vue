<template>
  <header class="header">
    <nav class="nav container">
      <div class="nav__data">
        <router-link to="/" class="nav__logo">
          <img src="../assets/css/img/Cooperativa de Servicios Publicos de Portena Ltda. -Photoroom.png" 
            alt="Coop de Servicios Públicos de Porteña" 
            class="nav__logo-img" />
        </router-link>

        <div class="nav__toggle" @click="toggleMenu">
          <i class="ri-menu-line nav__burger"></i>
        </div>
      </div>

      <div :class="['nav__menu', { 'show-menu': menuOpen }]">
        <div class="nav__toggle" @click="toggleMenu">
          <i class="ri-close-line"></i>
        </div>
        <ul class="nav__list">
          <li><router-link to="/" class="nav__link" @click="closeMenu">Inicio</router-link></li>
          <li><router-link to="/novedades" class="nav__link" @click="closeMenu">Novedades</router-link></li>
          <li class="dropdown__item">
            <div class="nav__link" @click="toggleUsMenu">
              Quienes Somos<i class="ri-arrow-down-s-line dropdown__arrow"></i>
            </div>
            <ul v-if="usMenuOpen" class="dropdown__menu">
              <li><router-link to="/historia" class="dropdown__link" @click="closeMenu">Historia</router-link></li>
              <li><router-link to="/mvv-objetivos" class="dropdown__link" @click="closeMenu">Misión, Valores y Objetivos</router-link></li>
              <li><router-link to="/autoridades" class="dropdown__link" @click="closeMenu">Autoridades</router-link></li>
            </ul>
          </li>

          <li class="dropdown__item">
            <div class="nav__link" @click="toggleDropdown">
              Servicios <i class="ri-arrow-down-s-line dropdown__arrow"></i>
            </div>
            <ul v-if="dropdownOpen" class="dropdown__menu">
              <li><router-link to="/energia" class="dropdown__link" @click="closeMenu"><i class="ri-flashlight-line"></i>Energía</router-link></li>
              <li><router-link to="/agua" class="dropdown__link" @click="closeMenu"><i class="ri-water-flash-line"></i>Agua Potable</router-link></li>
              <li><router-link to="/telecomunicaciones" class="dropdown__link" @click="closeMenu"><i class="ri-wifi-line"></i>Internet</router-link></li>
              <li><router-link to="/telefono" class="dropdown__link" @click="closeMenu"><i class="ri-phone-line"></i>Telefonía</router-link></li>
              <li>
                <router-link to="/cooplus" class="dropdown__link cooplus" @click="closeMenu">
                  <i class="ri-tv-line"></i> COOPLUS+
                </router-link>
              </li>
              <li class="dropdown__subitem" @mouseover="serviciosSocialesOpen = true" @mouseleave="serviciosSocialesOpen = false">
                <router-link to="/servicios-sociales" class="dropdown__link" @click="closeMenu">
                  <i class="ri-first-aid-kit-line"></i>Servicios Sociales<i :class="['ri-arrow-down-s-line', { 'rotate-arrow': serviciosSocialesOpen }]"></i>
                </router-link>
                <ul v-if="serviciosSocialesOpen" class="submenu__menu" :class="{ show: serviciosSocialesOpen }">
                  <li><router-link to="/detalle-traslado" class="dropdown__link" @click="closeMenu"><i class="ri-truck-line"></i>Traslado Social</router-link></li>
                  <li><router-link to="/detalle-banco" class="dropdown__link" @click="closeMenu"><i class="ri-drop-line"></i>Banco de Sangre</router-link></li>
                  <li><router-link to="/detalle-sepelio" class="dropdown__link" @click="closeMenu"><i class="ri-cross-fill"></i>Sepelio</router-link></li>
                </ul>
              </li>
            </ul>
          </li>
          <li><router-link to="/contacto" class="nav__link" @click="closeMenu">Contacto</router-link></li>
          <li class="dropdown__item user__menu">
            <div class="nav__link" @click="toggleUserMenu">
              <i class="ri-user-line"></i> 
              {{ isAuthenticated ? `Bienvenido ${userName}` : "Mi Cuenta" }} 
              <i class="ri-arrow-down-s-line dropdown__arrow"></i>
            </div>
            <p v-if="isAuthenticated" class="user__email">{{ getUser?.email }}</p>
            <ul v-if="userMenuOpen" class="dropdown__menu">
              <template v-if="!isAuthenticated">
                <li><router-link to="/login" class="dropdown__link" @click="closeMenu">Iniciar Sesión</router-link></li>
                <li><router-link to="/registro" class="dropdown__link" @click="closeMenu">Registrarse</router-link></li>
              </template>
              <template v-else>
                <div v-if="isAdmin">
                  <li><router-link to="/administracion" class="dropdown__link" @click="closeMenu">Panel de ADMIN</router-link></li>
                </div>
                <li><router-link to="/perfil" class="dropdown__link" @click="closeMenu">Mi Perfil</router-link></li>
                <li><router-link to="/reclamos" class="dropdown__link" @click="closeMenu">Reclamos</router-link></li>
                <li><a href="#" class="dropdown__link logout" @click="logoutUser()">Cerrar Sesión</a></li>
              </template>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false,
      dropdownOpen: false,
      userMenuOpen: false,
      usMenuOpen: false,
      serviciosSocialesOpen: false,
      isMobile: window.innerWidth <= 768, 
    };
  },
  mounted() {
    window.addEventListener("resize", this.checkMobile);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkMobile);
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
      if (!this.menuOpen) {
        this.closeMenu();
      }
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    toggleUserMenu() {
      this.userMenuOpen = !this.userMenuOpen;
    },
    toggleServiciosSociales() {
      this.serviciosSocialesOpen = !this.serviciosSocialesOpen;
    },
    toggleUsMenu() {
      this.usMenuOpen = !this.usMenuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
      this.userMenuOpen = false;

      if (!this.isMobile) {
        this.dropdownOpen = false;
        this.usMenuOpen = false;
        this.serviciosSocialesOpen = false;
      }
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 1024;
    },
  },
};  
</script>

  
  
<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  transition: all 0.3s ease-in-out;
  z-index: 1000; 
}
.header.scrolled {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.9); 
}
.user__email {
  font-size: 0.7rem;
  color: #b0b0b0;
  margin-top: -5px;
  padding-left: 25px;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 200px;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 20px;
  top: 0;
  left: 0;
  z-index: 1000;
  background: #0e1850;
  color: #fff;
  width: 100%;
}

.nav__logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
}

.nav__logo-img {
  margin-top: 10px;
  height: 100px;
}

.nav__toggle {
  font-size: 1.8rem;
  cursor: pointer;
  display: none;
}

.nav__menu {
  display: flex;
}

.nav__list {
  display: flex;
  gap: 1.4rem;
  list-style: none;
}

.nav__link {
  text-decoration: none;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.nav__link:hover {
  transform: translateY(-2px);
  color: #7fb6ff;
}

.dropdown__item {
  position: relative;
}

.dropdown__menu {
  position: absolute;
  background: hsl(221, 53%, 12%);
  padding: 0.5rem 0;
  list-style: none;
  top: 2.5rem;
  left: 0;
  border-radius: 5px;
  width: 180px;
  display: flex;
  flex-direction: column;
  z-index: 100;
}
.dropdown__submenu {
  top: 0;
  left: 50%;
  background-color: hsl(221, 53%, 12%);
  display: none;
  z-index: 100;
  width: max-content;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.dropdown__submenu li {
  padding: 0.5rem 1rem;
}

.dropdown__submenu li:hover {
  background-color: #135c97;
}

.dropdown__item:hover .submenu__menu {
  display: block;
}

.dropdown__link {
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #fff;
  font-size: 0.9rem;
}

.dropdown__link:hover {
  background: #135c97;
  border-radius: 3px;
}
.dropdown__link.cooplus:hover {
  background: white !important;
  color: #eb01ef !important;
}

.dropdown__link.cooplus:hover i {
  color: #eb01ef !important;
}
.dropdown__link.logout:hover {
  background: white !important;
  color: #ef0101 !important;
}

.dropdown__link.logout:hover i {
  color: #ef0101 !important;
}
.rotate-arrow {
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}
.admin {
  background-color: #135c97;
  padding: 3.5px;
  border-radius: 5px;
  transition: all 0.3s ease;
  
}
.admin:hover {
  background: #0e82ff;
}
.nav__link.admin {
  color: white;
}
.nav__link.admin li{
  background: none !important; 
}
.ri-close-line {
  transition: ease 0.3s;
}
.ri-close-line:hover {
  color: red;
}
@media (max-width: 768px) { 
  .nav__logo-img {
    height: 70px;
  }
  .nav__toggle {
    display: block;
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: white;
  }

  .nav__menu {
    display: none;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    height: 85vh;
    width: 250px;
    padding: 2rem 1rem;
    background: rgba(13, 27, 42, 0.897);
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
    z-index: 9999;
  }

  .show-menu {
    display: flex;
  }

  .nav__list {
    flex-direction: column;
    gap: 1rem;
  }

  .dropdown__menu {
    width: 100%;
    position: relative;
    left: 0;
    top: 0;
  }

  .dropdown__item .nav__link {
    display: flex;
    justify-content: space-between;
  }
  .user__email {
    font-size: 0.75rem;
    text-align: center;
    max-width: 150px;
  }
}
</style>
