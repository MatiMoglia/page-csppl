<template>
<header class="header">
    <nav class="navbar">
        <div class="container">
        <img class="site-logo" src="https://www.coopspportena.com.ar/sites/default/files/logo-copservicios.png" alt="Coop de Servicios Públicos de Porteña">
            <ul class="nav-links">
                <li><router-link to="/">Inicio</router-link></li>
                <li><router-link to="/about">Historia</router-link></li>
                <li><router-link to="/services">Servicios</router-link></li>
                <li><router-link to="/contact">Contacto</router-link></li>
            </ul>
        </div>
    </nav>
</header>
</template>
<script>
  export default {
    name: "NavbarComponent",
  };
</script>
  
<style>
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap");
  @import url("https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.5.0/remixicon.css");

*{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}
  
body {
    font-family: var(--body-font);
    font-size: var(--normal-font-size);
    background-color: var(--body-color);
}
  
.navbar {
    width: 100%;
    height: var(--header-height);
    background-color: var(--dark-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
}
  
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}
  
.site-logo {
    width: 250px;
    height: auto;
    margin-right: 15px;
}
  
.nav-links {
    display: flex;
    gap: 20px;
    list-style: none;
}
  
.nav-links a {
    color: var(--white-color);
    font-size: var(--normal-font-size);
    font-weight: var(--font-medium);
    text-decoration: none;
    transition: color 0.3s;
}
  
.nav-links a:hover {
    color: var(--first-color);
}

</style>
  