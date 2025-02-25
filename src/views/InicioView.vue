<template>
        <section class="servicios">
            <h3>Nuestros Servicios</h3>
            <ul>
                <li v-for="servicio in servicios" :key="servicio.nombre">
                    <h4>{{ servicio.nombre }}</h4>
                    <p>{{ servicio.descripcion }}</p>
                </li>
            </ul>
        </section>
</template>

<script>
export default {
    data() {
        return {
            servicios: [
                { nombre: "Energía Eléctrica", descripcion: "Suministro de energía eléctrica." },
                { nombre: "Agua potable", descripcion: "Distribución de agua limpia y segura." },
                { nombre: "Telecomunicaciones", descripcion: "Conectividad rápida y confiable." },
                { nombre: "Alumbrado Público", descripcion: "Mantenimiento de las luminarias y de las líneas." },
                { nombre: "Servicios Sociales", descripcion: "Brindamos la posibilidad de que puedas proteger a tu familia." },

            ]
        };
    }
};
</script>

<style>
.home {
    text-align: center;
    padding: 20px;
}

.servicios {
    margin-top: 20px;
}

.servicios ul {
    list-style: none;
    padding: 0;
}

.servicios li {
    background: #f4f4f4;
    margin: 10px auto;
    padding: 15px;
    width: 50%;
    border-radius: 8px;
}
</style>