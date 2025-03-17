<template>
  <div id="app">
    <Navbar v-if="!$route.meta.hideNavbar" />
    <Spamlogin v-if="!$route.meta.hideSpam"/>
    <router-view />
    <Footer v-if="!$route.meta.hideFooter" />
    <ChatBot/>
  </div>
</template>


<script>
  import Navbar from './components/Navbar.vue';
  import Footer from './components/Footer.vue';
  import Spamlogin from './components/SpamLogin.vue';
  import ChatBot from './components/Chatbot.vue';
  export default {
    components: {
      Navbar,
      Footer,
      Spamlogin,
      ChatBot
    }
  };
</script>