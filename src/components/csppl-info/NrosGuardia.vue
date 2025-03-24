<template>
    <h2 class="title">Numeros de Guardia</h2>
    <div class="numeros">
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
.title {
    color: #1f2c79;
    background-color: #ececec38;
    font-size: 2rem;
    border-left: 5px solid #0e1850;
    border-right: 5px solid #0e1850;
    margin-left: 100px;
    margin-right: 100px;
    text-align: center;
    padding: 20px;
    margin-top: 30px;
}  
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

.numeros-guardia {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
}

.card {
    background: #fff;
    padding: 50px;
    border-radius: 10px;
    width: 300px;
    height: 200px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
}

.card i {
    font-size: 40px;
    color: #113e6e;
    margin-bottom: 15px;
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