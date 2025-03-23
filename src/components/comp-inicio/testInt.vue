<template>
    <div class="container">
      <h1 class="title">Test de Velocidad de Internet</h1>
      <div class="test-container">
        <iframe 
          src="https://www.nperf.com/es/" 
          class="speed-test"
        ></iframe>
      </div>
    </div>
  </template>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #f4f4f4;
    padding: 20px;
  }
  
  .title {
    color: #ffffff;
    background-color: #1f2c79;
    font-size: 2rem;
    padding: 15px;
    text-align: center;
    width: 100%;
    max-width: 800px;
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.2);
  }
  
  .test-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 800px;
    margin-top: 20px;
  }
  
  .speed-test {
    width: 100%;
    height: 450px;
    border: none;
    border-radius: 10px;
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.2);
  }
  </style>
  