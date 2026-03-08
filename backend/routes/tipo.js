const {Router} = require('express');

const {getTipos, createTipo} = require('../controllers/tipoController');

const router = Router();

router.get('/', getTipos);

router.post('/', createTipo);

module.exports = router;