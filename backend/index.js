const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const autoridadesRoutes = require('./routes/authoritiesRoutes');

app.use('/api/autoridades', autoridadesRoutes);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});