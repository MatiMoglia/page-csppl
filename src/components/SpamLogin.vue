<template>
    <div v-if="!isAuthenticated" class="mensaje-container">
      <transition name="fade" appear>
        <div class="mensaje">
          <span class="mensaje-texto" @click="Login">¡Iniciá sesión para enterarte de todas las novedades de la coop!</span>
        </div>
      </transition>
    </div>
</template>
  
<script>
import { mapGetters } from "vuex";
export default {
  name: "SpamLogin",
  methods: {
    Login() {
      this.$router.push("/login");
    }  
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
  }
};
</script>
  
<style scoped>
.mensaje-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  background: linear-gradient(90deg, #0e1850, #0e4979, #0e1850);
  padding: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
  
.mensaje {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  animation: pulse 2s infinite alternate;

}
  
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}
  
.fade-enter-active {
  animation: fadeIn 1.5s ease-in-out;
}
  
@keyframes fadeIn {
  from {
  opacity: 0;
  transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
  