const { Router } = require('express');
// Asegúrate de importar las nuevas funciones
const { createTipo, getTipos, updateTipo, deleteTipo } = require('../controllers/tipoController');

const router = Router();

// Las rutas que ya tenías:
router.post('/', createTipo);
router.get('/', getTipos);

// LAS NUEVAS RUTAS (Nota que llevan '/:id' porque necesitan saber a quién editar/borrar)
router.put('/:id', updateTipo);
router.delete('/:id', deleteTipo);

module.exports = router;