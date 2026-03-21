const { Router } = require('express');
// Asegúrate de importar las nuevas funciones
const { createGenero, getGeneros, updateGenero, deleteGenero } = require('../controllers/generoController');

const router = Router();

// Las rutas que ya tenías:
router.post('/', createGenero);
router.get('/', getGeneros);

// LAS NUEVAS RUTAS (Nota que llevan '/:id' porque necesitan saber a quién editar/borrar)
router.put('/:id', updateGenero);
router.delete('/:id', deleteGenero);

module.exports = router;