<template>
    <div v-if="loading || loadingRegister" class="loading-overlay">
      <div class="spinner"></div>
    </div>
  <div class="back-close" data-aos="fade-right">
    <router-link to="/" class="no-underline">
      <button class="close-btn">&times;</button>
    </router-link>
  </div>
  <div class="auth-container">
    <div class="register-form">
      <div class="wrapper" data-aos="fade-up">
        <div class="text-center name"><h2>Registro de Usuario</h2></div>
        <p>Completa el siguiente formulario:</p>
        <form @submit.prevent="submitForm">
          <div class="form-field">
            <i class="ri-user-line"></i>
            <input v-model="form.name" placeholder="Nombre Completo" required />
          </div>

          <div class="form-field">
            <i class="ri-calendar-line"></i>
            <input v-model="form.age" type="date" class="date" required/>
          </div>

          <div class="form-field">
            <i class="ri-phone-line"></i>
            <input v-model="form.phone" type="number" placeholder="Teléfono" required />
          </div>

          <div class="form-field">
            <i class="ri-mail-line"></i>
            <input v-model="form.email" type="email" placeholder="Correo" required />
          </div>

          <div class="form-field">
            <i class="ri-lock-line"></i>
            <input 
              v-model="form.password" 
              type="password" 
              placeholder="Contraseña" 
              required 
              @focus="showPasswordMessage = true" 
              @blur="showPasswordMessage = false" 
            />
          </div>

          <div v-if="showPasswordMessage" class="password-message">
            <strong>Importante:</strong> La contraseña debe tener al menos 6 caracteres y contener números.
          </div>

          <div class="form-field">
            <i class="ri-lock-line"></i>
            <input v-model="form.confirmPassword" type="password" placeholder="Confirmar Contraseña" required />
          </div>
          <p v-if="error" class="error-message">{{ error }}</p>

          <button class="btn-register">Registrarse</button>
        </form>

        <div class="login-link">
          <p>¿Ya tienes cuenta? <router-link to="/login">Inicia sesión</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from "vue3-toastify";
import { mapActions } from "vuex";
import "aos/dist/aos.css";
import AOS from "aos";

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        age: "",
        phone: "",
        password: "",
        confirmPassword: "",
      },
      error: null,
      showPasswordMessage: false,
      loading: false,
      loadingRegister: false,
    };
  },
  methods: {
    ...mapActions("auth", ["register"]),

    validarContraseña(password) {
      return password.length >= 6 && /\d/.test(password);
    },

    async submitForm() {
      this.error = null;
      this.loading = true;

      if (!this.validarContraseña(this.form.password)) {
        this.error = "La contraseña debe tener al menos 6 caracteres y un número.";
        toast.error(this.error, { autoClose: false }); 
        this.loading = false;
        return;
      }

      if (this.form.password !== this.form.confirmPassword) {
        this.error = "Las contraseñas no coinciden.";
        toast.error(this.error, { autoClose: false });
        this.loading = false;
        return;
      }

      try {
        const user = {
          name: this.form.name,
          email: this.form.email,
          age: this.form.age,
          phone: this.form.phone,
          password: this.form.password
        };
        await this.register(user);
        toast.success("Registro exitoso. Ya puedes iniciar sesión.");
        setTimeout(() => {
          this.loading = false;
          this.$router.push("/login");
        }, 3000); 
      } catch (error) {
        this.error = error.message; 
        toast.error("Ocurrió un error durante el registro.",
        { autoClose: 3000 });
        this.loading = false;
      }
    },
  },
  mounted() {
    AOS.init();
  },
};
</script>

<style scoped>
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
  border: 6px solid #f3f3f3;
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
.back-close {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
}
.no-underline {
  text-decoration: none;
}
.close-btn {
  background: rgba(255, 255, 255, 0.384);
  border: none;
  font-size: 40px;
  font-weight: bold;
  color: #001bb4;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.close-btn:hover {
  background: #ff4d4d;
  color: white;
  transform: scale(1.1);
}
.auth-container {
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
  background: #f0f0f0;
  background: url("../assets/css/img/logo\ nuevo.jpg") center/cover;
  animation: fadeIn 1.4s ease-in-out;
}

.register-form {
  width: 100%;
  max-width: 420px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.795);
  backdrop-filter: blur(3px);
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
  animation: fadeIn 1.4s ease-in-out;
}

.name {
  font-size: 1.6rem;
  font-weight: bold;
  color: #1f2c79;
  text-align: center;
}

.form-field {
  margin-top: 15px;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #1f2c79;
  padding: 10px;
  border-radius: 8px;
}

.form-field input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: rgb(49, 49, 49);
  font-size: 1rem;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
}
input::placeholder {
  font-weight: lighter !important;
}
.date{
  font-weight: inherit !important;
}
p {
  margin-top: 15px;
  font-size: 1rem;
  color: #000000;
  font-weight: bold;
}
h2 {
  font-size: 1.8rem;
}

.error-message {
  color: #ff4d4d;
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: 10px;
}
.password-message {
  color: #f10f0f;
  font-size: 0.9rem;
  text-align: left;
  margin-top: 10px;
  margin-left: 10px;
}
.btn-register {
  margin-top: 20px;
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

.btn-register:hover {
  background: #2848ff;
}

.login-link {
  margin-top: 10px;
  text-align: center;
  color: #4e4e4e;
}

.login-link a {
  color: #2848ff;
  text-decoration: none;
  font-weight: bold;
}

.login-link a:hover {
  text-decoration: underline;
}
i {
  font-size: 1.1rem;
  color: #2437a0;
  margin-right: 15px;
  font-weight: bold;
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
