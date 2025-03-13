<template>
  <div id="app">
    <navbar v-if="!$route.meta.hideNavbar" />
    <router-view />
    <footer v-if="!$route.meta.hideFooter" />
  </div>
</template>


<script>
  import Navbar from './components/Navbar.vue';
  import Footer from './components/Footer.vue';
  export default {
    components: {
      Navbar,
      Footer
    }
  };
</script>