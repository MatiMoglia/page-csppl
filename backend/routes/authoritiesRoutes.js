const express = require('express');
const router = express.Router();
const upload = require("../middlewares/upload");
const authoritiesController = require('../controllers/authoritiesController');

router.get("/", authoritiesController.getAutoridades);

router.post("/", upload.single('image'), authoritiesController.createAutoridad);
router.put("/:id", upload.single('image'), authoritiesController.updateAutoridad);

router.delete("/:id", authoritiesController.deleteAutoridad);

module.exports = router;