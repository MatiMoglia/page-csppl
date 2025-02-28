<template>
    <header class="header">
      <nav class="nav container">
        <div class="nav__data">
          <router-link to="/" class="nav__logo">
            <img src="https://www.coopspportena.com.ar/sites/default/files/logo-copservicios.png" 
                 alt="Coop de Servicios Públicos de Porteña" 
                 class="nav__logo-img" />
          </router-link>
  
          <div class="nav__toggle" @click="toggleMenu">
            <i :class="menuOpen ? 'ri-close-line nav__close' : 'ri-menu-line nav__burger'"></i>
          </div>
        </div>
  
        <div :class="['nav__menu', { 'show-menu': menuOpen }]">
          <ul class="nav__list">
            <li><router-link to="/" class="nav__link" @click="closeMenu">Inicio</router-link></li>
            <li class="dropdown__item">
            <div class="nav__link" @click="toggleUsMenu">
              Quienes Somos <i class="ri-arrow-down-s-line dropdown-arrow"></i>
            </div>
            <ul v-if="usMenuOpen" class="dropdown__menu">
              <li><router-link to="/historia" class="dropdown__link" @click="closeMenu">Historia</router-link></li>
              <li><router-link to="/mvv-objetivos" class="dropdown__link" @click="closeMenu">Misión, Valores y Objetivos</router-link></li>
              <li><router-link to="/autoridades" class="dropdown__link" @click="closeMenu">Autoridades</router-link></li>
              <li><router-link to="/trabajo-inter" class="dropdown__link" @click="closeMenu">Trabajo Institucional</router-link></li>
            </ul>
          </li>
  
            <li class="dropdown__item">
              <div class="nav__link" @click="toggleDropdown">
                Servicios <i class="ri-arrow-down-s-line dropdown__arrow"></i>
              </div>
              <ul v-if="dropdownOpen" class="dropdown__menu">
                <li><router-link to="/energia" class="dropdown__link" @click="closeMenu"><i class="ri-flashlight-line"></i>Energía</router-link></li>
                <li><router-link to="/agua" class="dropdown__link" @click="closeMenu"><i class="ri-water-flash-line"></i>Agua Potable</router-link></li>
                <li><router-link to="/internet" class="dropdown__link" @click="closeMenu"><i class="ri-wifi-line"></i>Internet y Telefonía</router-link></li>
                <li>
                  <router-link to="/cooplus" class="dropdown__link cooplus" @click="closeMenu">
                    <i class="ri-tv-line"></i> COOPLUS+
                  </router-link>
                </li>
              </ul>
            </li>
            <li><router-link to="/contact" class="nav__link" @click="closeMenu">Contacto</router-link></li>
            
            <li class="dropdown__item user__menu">
              <div class="nav__link" @click="toggleUserMenu">
                <i class="ri-user-line"></i> Mi Cuenta <i class="ri-arrow-down-s-line dropdown__arrow"></i>
              </div>
              <ul v-if="userMenuOpen" class="dropdown__menu">
                <li><router-link to="/login" class="dropdown__link" @click="closeMenu">Iniciar Sesión</router-link></li>
                <li><router-link to="/register" class="dropdown__link" @click="closeMenu">Registrarse</router-link></li>
                <li><router-link to="/profile" class="dropdown__link" @click="closeMenu">Mi Perfil</router-link></li>
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
      };
    },
    methods: {
      toggleMenu() {
        this.menuOpen = !this.menuOpen;
        if (!this.menuOpen) {
          this.dropdownOpen = false;
          this.userMenuOpen = false;
          this.usMenuOpen = false;
        }
      },
      toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
      },
      toggleUserMenu() {
        this.userMenuOpen = !this.userMenuOpen;
      },
      toggleUsMenu() {
        this.usMenuOpen = !this.usMenuOpen;
      },
      closeMenu() {
        this.menuOpen = false;
        this.dropdownOpen = false;
        this.userMenuOpen = false;
        this.usMenuOpen = false;
      },
    },
  };
  </script>
  
  
  <style scoped>
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    top: 0;
    left: 0;
    z-index: 1000;
    background: #0e1850;
    color: #fff;
    width: 100%;
  }
  
  .nav__logo {
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #fff;
  }
  
  .nav__logo-img {
    height: 65px;
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
    gap: 1.5rem;
    list-style: none;
  }
  
  .nav__link {
    text-decoration: none;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
  }
  
  .nav__link:hover {
    color: #184e94;
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
  
  @media (max-width: 768px) {
    .nav__toggle {
      display: block;
    }
  
    .nav__menu {
      display: none;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0;
      background: #0d1b2a;
      width: 100%;
      padding: 1rem;
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
    left: 10;
    top: 10; 
  }

  .dropdown__item .nav__link {
    display: flex;
    justify-content: space-between;
  }
  }
</style>
  