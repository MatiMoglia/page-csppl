<template>
      <div v-if="loading" class="loading-overlay">
        <div class="spinner"></div>
      </div>
    <div class="back-button" data-aos="fade-right">
        <button @click="$router.push('/')">Volver al menú</button>
      </div>
    <div class="login-container">
      <div class="login-form">
        <div class="cyber-bg"></div>
        <div class="wrapper" data-aos="fade-up">
          <div class="logo-container">
            <img src="../assets/css/img/logo nuevo.jpg" alt="Logo" class="logo">
          </div>
          <div class="text-center name">Inicio de sesión</div>
          <form @submit.prevent="handleLogin">
            <div class="form-field">
              <i class="ri-user-line"></i>
              <input
                type="email"
                v-model="email"
                placeholder="Ingrese su Email"
                
              />
            </div>
            <div class="form-field">
              <i class="ri-lock-line"></i>
              <input
                type="password"
                v-model="password"
                placeholder="Ingrese su Contraseña"
                
              />
            </div>
            <button class="btn-login">Ingresar</button>
          </form>
          <div class="register-link">
            <p>¿No tienes cuenta? <router-link to="/registro"><br>Regístrate aquí</router-link></p>
          </div>
        </div>
      </div> 
      <div class="wrapper" data-aos="fade-right">
        <div class="login-image">
        <img src="../assets/css/img/GLPE26UB6JFNFBSL3ZOB2U34SU.jpg" alt="Banner" />
      </div>
      </div>
    </div>
</template>
  
  
<script>
  import AOS from "aos";
  import { toast } from "vue3-toastify";
  import { mapActions } from "vuex";
  import "aos/dist/aos.css";
  
  export default {
    name: "Login",
    data() {
      return {
        email: "",
        password: "",
        loading: false,
      }
    },
    methods: {
        ...mapActions("auth", ["login"]),
        async handleLogin() {
          this.loading = true;
        const success = await this.login({ email: this.email, password: this.password });
        if (success) {
            toast.success("Inicio de sesión exitoso", {
            autoClose: 3000,
        });
        setTimeout(() => {
          this.$router.push("/");
        }, 3000);
        } else {
          toast.error("Error: Email o contraseña incorrectos", { autoClose: 3000});
          this.loading = false;
        }
        this.loading = false;
      }
    },
    mounted() {
      AOS.init();
    },
  };
</script>
  
<style scoped>
  body, html {
  margin: 0;
  padding: 0;
  height: 100%;
}
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.377);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.spinner {
  border: 6px solid #ffffff;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.back-button {
  position: absolute;
  top: 10px;
  left: 10px;
}
.back-button button {
  margin-top: 5px;
  width: 100%;
  padding: 7px;
  background: #030c3d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.5s ease;
  font-family: "Montserrat", sans-serif;
}
.back-button button:hover {
  background: #c75353;
}

.login-container {
  display: flex;
  height: 100vh;
  justify-content: space-between;
  background: #f0f0f0;
}
  
.login-form {
  flex: 1;
  max-width: 526px;
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ddd;
  border-right: 10px solid #1f2c79;
}
  
.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}
  
.logo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 10px solid #1f2c79 ;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.logo:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
  
.name {
  font-size: 2rem;
  font-weight: bold;
  color: #1f2c79;
  text-align: center;
}
  
.form-field {
  margin-top: 20px;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #1f2c79;
  padding: 12px;
  border-radius: 8px;
}
  
.form-field input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: rgb(55, 110, 212);
  font-size: 1.1rem;
  font-family: "Montserrat", sans-serif;
}
  
.btn-login {
  margin-top: 25px;
  width: 100%;
  padding: 12px;
  background: #0e1850;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}
  
.btn-login:hover {
  background: #2848ff;
}
  
i {
  font-size: 1.2rem;
  color: #2848ff;
  margin-right: 10px;
  font-weight: bold;
}
  
.register-link {
  margin-top: 10px;
  text-align: center;
  color: #4e4e4e;
}
  
.register-link a {
  color: #2848ff;
  text-decoration: none;
  font-weight: bold;
}
  
.register-link a:hover {
  text-decoration: underline;
}
  
.login-image {
  flex: 1;
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: right;
}
  
.login-image img {
  margin-top: 40px;
  max-width: 210%;
  max-height: 90%;
  opacity: 0.7; 
}
.cyber-bg {
  position: fixed;
  top: 1;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.wrapper {
  max-width: 400px;
  width: 90%; 
  border-radius: 15px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>