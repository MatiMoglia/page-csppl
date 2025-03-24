<template>
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
</template>
<style scoped>
.redes-sociales {
  margin-top: 20px;
  text-align: center;
  margin-bottom: 20px;
  padding: 20px;
}
  
.redes-sociales h2 {
  font-size: 1.6rem;
  color: #1f2c79;
  border-top: 3px solid #0e1850;
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
</style>