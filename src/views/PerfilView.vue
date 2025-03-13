<template>
    <div class="auth-container">
      <h2>Registro</h2>
      <form @submit.prevent="submitForm">
        <input v-model="form.nombre" placeholder="Nombre" required />
        <input v-model="form.apellido" placeholder="Apellido" required />
        <input v-model="form.fechaNacimiento" type="date" required />
        <input v-model="form.telefono" type="tel" placeholder="Teléfono" required />
        <input v-model="form.email" type="email" placeholder="Correo" required />
        <input v-model="form.password" type="password" placeholder="Contraseña" required />
        <button type="submit">Registrarse</button>
      </form>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        form: {
          nombre: '',
          apellido: '',
          email: '',
          fechaNacimiento: '',
          telefono: '',
          password: ''
        },
        error: null
      };
    },
    methods: {
      ...mapActions(['register']),
      async submitForm() {
        try {
          await this.register(this.form);
          this.$router.push('/');
        } catch (err) {
          this.error = err.message;
        }
      }
    }
  };
  </script>
  