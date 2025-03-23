<template>
  <div class="numeros">
        <h2>Nuestros números de guardia:</h2>
        <div class="fila">
        <div class="card">
            <i class="ri-phone-line"></i>
            <p>Guardia <br>Telecomunicaciones</p>
            <strong>3564630995</strong>
        </div>
        <div class="card">
            <i class="ri-phone-line"></i>
            <p>Guardia <br> Energía Eléctrica</p>
            <strong>3564593558</strong>
        </div>
        <div class="card">
            <i class="ri-phone-line"></i>
            <p>Guardia <br>Agua Potable</p>
            <strong>3564593561</strong>
        </div>
    </div>
    <div class="fila">
        <div class="card">
            <i class="ri-phone-line"></i>
            <p>Guardia <br>Traslado Social</p>
            <strong>3564593560</strong>
        </div>
        <div class="card">
            <i class="ri-phone-line"></i>
            <p>Guardia <br>Banco de Sangre</p>
            <strong>3564562394</strong>
        </div>
        <div class="card">
            <i class="ri-phone-line"></i>
            <p>Guardia <br>Sepelio</p>
            <strong>3564330362</strong>
        </div>
    </div>
  </div>
</template>
<style scoped>
.numeros {
    text-align: center;
    width: 100%;
    margin-top: 10px;
}
.fila {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 10px;
}
h2 {
    color: #0e1850;
    text-align: center;
    margin: 30px;
}

.numeros-guardia {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
}

.card {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 250px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.card i {
    font-size: 30px;
    color: #113e6e;
    margin-bottom: 10px;
}

.card strong {
    display: block;
    font-size: 20px;
    margin-top: 5px;
    color: #333;
}
@media (max-width: 768px) {
    .numeros-guardia {
      flex-direction: column;
      align-items: center;
    }
}
</style>