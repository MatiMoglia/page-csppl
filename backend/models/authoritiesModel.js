const pool = require('../db');

module.exports = {
  async obtenerAutoridades() {
    const [rows] = await pool.query("SELECT title, position, image_url, BIN_TO_UUID(id) as id FROM autoridadesdb.autoridades");
    return rows;
  },

  async crearAutoridad(autoridad) {
    const { title, position, image_url } = autoridad;
    const [result] = await pool.query(
      "INSERT INTO autoridadesdb.autoridades (title, position, image_url) VALUES (?, ?, ?)",
      [title, position, image_url]
    );
    return result.insertId;
  },

  async actualizarAutoridad(id, autoridad) {
    const { title, position, image_url } = autoridad;
    const [result] = await pool.query(
      "UPDATE autoridadesdb.autoridades SET title = ?, position = ?, image_url = ? WHERE id = UUID_TO_BIN(?)",
      [title, position, image_url, id]
    );
  
    return result.affectedRows > 0;
  },

  async eliminarAutoridad(id) {
    const [result] = await pool.query(
      "DELETE FROM autoridadesdb.autoridades WHERE id = UUID_TO_BIN(?)",
      [id]
    );
    return result.affectedRows > 0;
  }
};