const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const autoridadesRoutes = require('./routes/authoritiesRoutes');

app.use('/api/autoridades', autoridadesRoutes);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});