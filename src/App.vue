<template>
  <Navbar/>
  <div>
      <router-view></router-view>
  </div>
  <Footer></Footer>
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