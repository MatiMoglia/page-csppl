const express = require('express');
const router = express.Router();
const controller = require('../controllers/authoritiesController');

router.get('/', controller.getAutoridades);

module.exports = router;