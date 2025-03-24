<template>
    <section class="contacto">
      <br>
      <div class="header">
            <h1>Información de Contacto:</h1>
            <div class="header-cv">
                <h3>¡Sumate a nuestro equipo!</h3>
                <button @click="openModal">Enviar CV</button>
            </div>
        </div>
      <div class="contacto-info">
        <p><strong>Atención:</strong> Lunes a viernes de 7:00 a 14:00</p>
        <p><strong>Casa Central:</strong> Av. Simón Daniele 259, Porteña, Córdoba. C.P.: 2415</p>
        <p><strong>Teléfono FIjo:</strong> 03564 450 000</p>
        <p><strong>Número de WhatsApp:</strong> 3564-331499</p>
        <p><strong>Número de nuestro ChatBot Lily:</strong> 3564-330695</p>
        <p><strong><i class="ri-mail-line"></i> e-mail Administración:</strong> <a href="mailto:admcsppl@gmail.com">admcsppl@gmail.com</a></p>
        <p><strong><i class="ri-mail-line"></i> e-mail Contabilidad:</strong> <a href="mailto:contabilidad@gmail.com">contabilidad@gmail.com</a></p>
        <p><strong><i class="ri-mail-line"></i> e-mail Telecomunicaciones:</strong> <a href="mailto:telecomunicaciones@gmail.com">telecomunicaciones@gmail.com</a></p>
        <div class="google-map">
          <h3>Ubicación:</h3>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2033.169553011653!2d-62.066510308304444!3d-31.01594009389834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x943520ae808be0f7%3A0x7e78582e3cfd3a1a!2sCooperativa%20De%20Servicios%20Publicos%20De%20Porte%C3%B1a%20Limitada.!5e0!3m2!1ses-419!2sar!4v1740797966515!5m2!1ses-419!2sar" 
            width="100%" 
            height="300" 
            frameborder="0" 
            style="border:0;" 
            allowfullscreen="">
          </iframe>
        </div>
      </div>
    
      <div class="form-and-video">
          <div class="contact-form">
            <h2>Envianos tu Consulta</h2>
            <p>Completa el siguiente formulario para que nos pueda enviar su consulta o reclamo.</p>
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <label for="name">Nombre:</label>
                <input type="text" id="name" v-model="form.name" required>
              </div>
              
              <div class="form-group">
                <label for="email">E-mail:</label>
                <input type="email" id="email" v-model="form.email" required>
              </div>
    
              <div class="form-group">
                <label>Área:</label>
                <select v-model="form.area" required>
                  <option value="Servicios Sociales">Servicio: Servicios Sociales</option>
                  <option value="Telecomunicaciones">Servicio: Telecomunicaciones</option>
                  <option value="Energía Eléctrica">Servicio: Energía Elécctrica</option>
                  <option value="Alumbrado Público">Servicio: Alumbrado Público</option>
                  <option value="Agua Potable">Servicio: Agua Potable</option>
                  <option value="Administracion">Administración</option>
                  <option value="Compras/Ventas">Compras-Ventas</option>
                  <option value="Facturación">Facturación</option>
                  <option value="Pagina Web/CoopOnline">Pagina Web-CoopOnline</option>
                </select>
              </div>
  
              <div class="form-group">
                <label for="message">Consulta:</label>
                <textarea id="message" v-model="form.message" required></textarea>
              </div>
              <button type="submit">Enviar Consulta</button>
            </form>
        </div>
  
        <div class="video-section">
            <h2>¡Conocé nuestra Cooperativa!</h2>
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/We4cWbC8Ya4?si=tllsKxivdoE6V0uv" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <div class="redes-sociales">
                <h2>¡Síguenos en nuestras redes sociales!</h2>
                <div class="social-links">
                    <a href="https://www.facebook.com/coop.portena?locale=es_LA" target="_blank">
                        <i class="ri-facebook-fill"></i> Facebook
                    </a>
                    <a href="https://www.instagram.com/coop.portena?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank">
                        <i class="ri-instagram-fill"></i> Instagram
                    </a>
                </div>
            </div>
        </div>
      </div>
      <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
            <div class="modal-content">
                <button class="modal-close-btn" @click="closeModal">×</button> 
                <h2>Enviar CV</h2>
                <form @submit.prevent="handleSubmitCV">
                    <div class="form-group">
                        <label for="cvName">Nombre: *</label>
                        <input type="text" id="cvName" v-model="cvForm.name" required>
                    </div>
                    <div class="form-group">
                        <label for="cvEmail">E-mail: *</label>
                        <input type="email" id="cvEmail" v-model="cvForm.email" required>
                    </div>
                    <div class="form-group">
                        <label>Área de Trabajo: *</label>
                        <div class="checkbox-group">
                            <div class="checkbox-column">
                                <span v-for="(opcion, index) in areasDisponibles.slice(0, 3)" :key="index" class="checkbox-item">
                                    <input class="form-checkbox" type="checkbox" :value="opcion" v-model="cvForm.area">
                                    <label>{{ opcion }}</label>
                                </span>
                            </div>
                            <div class="checkbox-column">
                                <span v-for="(opcion, index) in areasDisponibles.slice(3, 6)" :key="index" class="checkbox-item">
                                    <input class="form-checkbox" type="checkbox" :value="opcion" v-model="cvForm.area">
                                    <label>{{ opcion }}</label>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="cvFile">Adjuntar CV: *</label>
                        <input type="file" id="cvFile" @change="handleFileUpload" multiple required>
                    </div>
                    <button type="submit" class="modal-submit-btn">Enviar</button> 
                </form>
            </div>
        </div>
    </section>
</template>

<script>
  export default {
    data() {
      return {
        form: {
            name: '',
            email: '',
            message: '',
            
        },
        cvForm: {
            name: '',
            email: '',
            file: null,
            area: [],
        },
        areasDisponibles: [
            "Servicios Sociales",
            "Telecomunicaciones",
            "Energía Eléctrica",
            "Agua Potable",
            "Administración",
            "Todas"
        ],
        isModalOpen: false,
      };
    },
    methods: {
    handleSubmit() {
        console.log(this.form);
        this.form.name = '';
        this.form.email = '';
        this.form.area = '';
        this.form.message = '';
    },
    openModal() {
        this.isModalOpen = true;
    },
    closeModal() {
        this.isModalOpen = false;
    },
    handleSubmitCV() {
        console.log(this.cvForm);
        this.cvForm.name = '';
        this.cvForm.email = '';
        this.cvForm.file = null;
        this.closeModal();
    },
    handleFileUpload(event) {
      const files = event.target.files;
      this.cvForm.file = Array.from(files); 
    },
  },
};
</script>
  
<style scoped>
.header {
  display: flex;
  justify-content: space-between; 
  align-items: center;
}
.header-cv{
  justify-content: space-between; 
  align-items: center;
  background-color:#ddd ;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}
.header-cv h3{
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #1f2c79;
}

.header button {
  padding: 7px 10px !important;
  width: 100%;
  background-color: #0e1850;
  color: white;
  font-size: 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
}

.header button:hover {
  background-color: #2e78da;
}
.contacto {
  max-width: 1200px;
  margin: 0 auto;
  text-align: left;
}
.contacto p {
  margin-left: 10px;
}
.contacto h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #1f2c79;
  border-left: 5px solid #0e1850;
  padding: 25px;
}

.contacto-info {
  margin-bottom: 20px;
}
.contacto-info h3{
  font-size: 1.6rem;
  margin-top: 20px;
  margin-bottom: 20px;
  color: #1f2c79;
}

.contacto p {
  font-size: 1.1rem;
  margin-bottom: 15px;
  color: #333;
}

.contacto h2 {
  font-size: 1.6rem;
  margin-top: 20px;
  color: #1f2c79;
}

.google-map iframe {
  width: 80%;
  height: 400px;
  border: 0;
}

.form-and-video {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  padding: 20px;
}

.contact-form,
.video-section {
  flex: 1;
  min-width: 300px;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.contact-form h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.contact-form .form-group {
  margin-bottom: 15px;
}

.contact-form label {
  display: block;
  font-size: 1rem;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.contact-form
input,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}
#message 
{
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
}
.contact-form button {
  padding: 15px 10px;
  width: 100%;
  background-color: #11944c;
  color: white;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
}
.contact-form button:hover {
  background-color: #066d34;
}
.video-section video {
  width: 100%;
  border-radius: 5px;
}
.video-section h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}
.redes-sociales {
  text-align: center;
  margin-top: 20px;
}

.redes-sociales h2 {
  font-size: 1.6rem;
  color: #1f2c79;
  border-top: 5px solid #0e1850;
  padding: 15px;
  width: 100%;
}

.social-links {
  display: flex; 
  justify-content: center; 
  gap: 60px;
  margin-top: 20px; 
}

.social-links a {
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  color: #124172;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;
}

.social-links a:hover {
  color: #4699f3;
}

.social-links i {
  font-size: 2rem;
  margin-right: 10px;
  color: #2600ff;
  transition: color 0.3s;
}

.social-links a:hover i {
  color: #4699f3;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  position: relative;
}

.modal-content h2 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  margin-top: 0px;
}

.modal-content .form-group {
  margin-bottom: 15px;
}

.modal-content label {
  display: block;
  font-size: 1rem;
  margin-bottom: 5px;
}

.modal-content input[type="text"],
.modal-content input[type="email"],
.modal-content input[type="file"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.checkbox-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 0px !important;
}
.modal-close-btn {
  position: absolute;
  top: 5px;
  right: 10px;
  padding: 10px;
  font-size: 24px;
  color: #333;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;
}

.modal-close-btn:hover {
  color: red;  
}

.modal-submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #2e78da;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.modal-submit-btn:hover {
  background-color: #1d5aa4;
}

.checkbox-column {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 10px;
}
.modal-submit-btn {
  padding: 7px 10px !important;
  width: 100%;
  background-color: #1c9150;
  color: white;
  font-size: 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
}
.modal-submit-btn:hover {
  background-color: #066d34;
}
</style>
  