<template>
    <h1 class="title">Reclamos y Consultas</h1>
    <formReclamos/>
</template>
<script>
import formReclamos from '@/components/formReclamos.vue';
export default {
    components: {
        formReclamos
    }
};
</script>
<style scoped>
.title {
    color: #ffffff;
    background-color: #1f2c79;
    font-size: 2.5rem;
    padding: 15px;
    text-align: center;
}
</style>