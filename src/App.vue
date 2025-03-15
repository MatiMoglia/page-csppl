<template>
  <div id="app">
    <Navbar v-if="!$route.meta.hideNavbar" />
    <Spamlogin v-if="!$route.meta.hideSpam"/>
    <router-view />
    <Footer v-if="!$route.meta.hideFooter" />
  </div>
</template>


<script>
  import Navbar from './components/Navbar.vue';
  import Footer from './components/Footer.vue';
  import Spamlogin from './components/SpamLogin.vue';
  export default {
    components: {
      Navbar,
      Footer,
      Spamlogin,
    }
  };
</script>