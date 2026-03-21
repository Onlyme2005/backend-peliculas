const { Router } = require('express');
// Asegúrate de importar las nuevas funciones
const { createDirector, getDirectores, updateDirector, deleteDirector } = require('../controllers/directorController');

const router = Router();

// Las rutas que ya tenías:
router.post('/', createDirector);
router.get('/', getDirectores);

// LAS NUEVAS RUTAS (Nota que llevan '/:id' porque necesitan saber a quién editar/borrar)
router.put('/:id', updateDirector);
router.delete('/:id', deleteDirector);

module.exports = router;