<template>
    <div class="form-container">
      <div class="form-section">
        <h2>Formulario de Adhesión</h2>
        <form @submit.prevent="enviarFormulario">
          
          <label for="nombre">Nombre y Apellido *</label>
          <input type="text" id="nombre" v-model="form.nombre" :class="{'input-error': !form.nombre && formSubmitted}" required />
  
          <label for="direccion">Dirección *</label>
          <input type="text" id="direccion" v-model="form.direccion" :class="{'input-error': !form.direccion && formSubmitted}" required />
  
          <label for="dni">DNI *</label>
          <input type="text" id="dni" v-model="form.dni" :class="{'input-error': !form.dni && formSubmitted}" required />
  
          <label for="fechaNacimiento">Fecha de Nacimiento *</label>
          <input type="date" id="fechaNacimiento" v-model="form.fechaNacimiento" :class="{'input-error': !form.fechaNacimiento && formSubmitted}" required />
  
          <label for="telefono">Teléfono *</label>
          <input type="tel" id="telefono" v-model="form.telefono" :class="{'input-error': !form.telefono && formSubmitted}" required />
  
          <label for="email">Email *</label>
          <input type="email" id="email" v-model="form.email" :class="{'input-error': !form.email && formSubmitted}" required />
  
          <label>Selecciona el Pack *</label>
          <select v-model="form.pack" :class="{'input-error': !form.pack && formSubmitted}" required>
            <option value="">Selecciona un pack</option>
            <option value="Pack Hogar">Pack Hogar</option>
            <option value="Pack CooPlus">Pack CooPlus</option>
          </select>
  
          <label for="decodificadores">Cantidad de Decodificadores *</label>
          <select v-model="form.decodificadores" :class="{'input-error': !form.decodificadores && formSubmitted}" required>
            <option value="">Selecciona la cantidad de decodificadores</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="Más de 3">Más de 3</option>
          </select>
  
          <div v-if="form.decodificadores === 'Más de 3'">
            <label for="cuentaAdicional">Decos adicionales con una nueva cuenta *</label>
            <input type="number" id="cuentaAdicional" v-model="form.cuentaAdicional" :class="{'input-error': !form.cuentaAdicional && formSubmitted}" required />
          </div>
  
          <button type="submit">Enviar</button>
        </form>
      </div>
      <div class="video-section">
        <h3>¿Tienes alguna consulta?</h3>
        <textarea placeholder="Deja tu mensaje aquí..." v-model="form.consulta" :class="{'input-error': !form.consulta && formSubmitted}"></textarea>
  
        <h3>Conoce más sobre nuestro servicio</h3>
                <div class="video-section">
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/cQCvt9xZoSY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { toast } from 'vue3-toastify';
  
  export default {
    props: ['pack'],
    data() {
      return {
        form: {
          nombre: '',
          direccion: '',
          dni: '',
          fechaNacimiento: '',
          telefono: '',
          email: '',
          pack: this.pack, 
          decodificadores: '',
          cuentaAdicional: '',
          consulta: '',
        },
        formSubmitted: false,
      };
    },
    methods: {
      enviarFormulario() {
        this.formSubmitted = true;
        const requiredFields = ['nombre', 'direccion', 'dni', 'fechaNacimiento', 'telefono', 'email', 'pack', 'decodificadores', 'consulta'];
        if (this.form.decodificadores === 'Más de 3') {
          requiredFields.push('cuentaAdicional');
        }
  
        const isFormValid = requiredFields.every(field => this.form[field]);
  
        if (!isFormValid) {
          toast.error('Por favor, complete todos los campos obligatorios.');
          return;
        }
        toast.success('Formulario enviado correctamente.');
      },
    },
  };
  </script>
  
  <style scoped>
  .form-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    padding: 20px;
    margin-top: 30px;
  }
  
  .form-section {
    background-color: #f4f4f4;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  h2, h3 {
    text-align: left;
    color: #0e1850;
  }
  
  label {
    font-weight: bold;
    display: block;
    margin-top: 15px;
    margin-bottom: 5px;
  }
  
  input, select, textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1em;
  }
  
  input:focus, select:focus, textarea:focus {
    border-color: #0e1850;
  }
  
  .input-error {
    border-color: red;
  }
  
  button {
    width: 100%;
    padding: 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1.2em;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0e1850;
  }
  
  .video-section {
    padding: 30px;
    background-color: #f4f4f4;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  textarea {
    height: 150px;
    resize: vertical;
  }
  
  @media (max-width: 768px) {
    .form-container {
      grid-template-columns: 1fr; 
    }
  }
  </style>
  