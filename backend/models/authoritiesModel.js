const pool = require('../db');

module.exports = {
  async obtenerAutoridades() {
    const [rows] = await pool.query("SELECT title, position, image_url, BIN_TO_UUID(id) as id FROM autoridadesdb.autoridades");
    return rows;
  }
};