<template>
 <div id="app" :class="{ 'body-padding': !$route.meta.hideBodyStyle }">
    <Navbar v-if="!$route.meta.hideNavbar" />
    <Spamlogin v-if="!$route.meta.hideSpam"/>
    <router-view />
    <Footer v-if="!$route.meta.hideFooter" />
    <ChatBot/>
    <wspLogo/>
  </div>
</template>


<script>
  import Navbar from './components/Navbar.vue';
  import Footer from './components/Footer.vue';
  import Spamlogin from './components/SpamLogin.vue';
  import ChatBot from './components/Chatbot.vue';
  import wspLogo from './components/wspLogo.vue';
  export default {
    components: {
      Navbar,
      Footer,
      Spamlogin,
      ChatBot,
      wspLogo
    }
  };
</script>
<style>
 .body-padding {
    padding-top: 80px; 
  }
</style>