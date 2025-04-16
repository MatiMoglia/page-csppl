const autoridadesModel = require("../models/authoritiesModel");

module.exports = {
  async getAutoridades(req, res) {
    try {
      const autoridades = await autoridadesModel.obtenerAutoridades();
      res.json(autoridades);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener autoridades" });
    }
  },

  async createAutoridad(req, res) {
    try {
      const { title, position } = req.body;
      const image_url = req.file ? `/uploads/${req.file.filename}` : null;
  
      const id = await autoridadesModel.crearAutoridad({ title, position, image_url });
      res.status(201).json({ success: true, id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al crear autoridad" });
    }
  },
  
  async updateAutoridad(req, res) {
    try {
      const { title, position } = req.body;
      const image_url = req.file ? `/uploads/${req.file.filename}` : req.body.image_url;
  
      const success = await autoridadesModel.actualizarAutoridad(req.params.id, {
        title,
        position,
        image_url
      });
  
      if (success) {
        res.json({ success: true });
      } else {
        res.status(404).json({ message: "Autoridad no encontrada" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al actualizar autoridad" });
    }
  },

  async deleteAutoridad(req, res) {
    try {
      const success = await autoridadesModel.eliminarAutoridad(req.params.id);
      if (success) {
        res.json({ success: true });
      } else {
        res.status(404).json({ message: "Autoridad no encontrada" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar autoridad" });
    }
  }
};
