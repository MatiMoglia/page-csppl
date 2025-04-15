const autoridadesModel = require('../models/authoritiesModel');

module.exports = {
  async getAutoridades(req, res) {
    try {
      const autoridades = await autoridadesModel.obtenerAutoridades();
      res.json(autoridades);
    } catch (err) {
      console.error("Error en controller:", err);
      res.status(500).send("Error interno");
    }
  }
};