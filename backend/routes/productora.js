const { Router } = require('express');
// Asegúrate de importar las nuevas funciones
const { createProductora, getProductoras, updateProductora, deleteProductora } = require('../controllers/productoraController');

const router = Router();

// Las rutas que ya tenías:
router.post('/', createProductora);
router.get('/', getProductoras);

// LAS NUEVAS RUTAS (Nota que llevan '/:id' porque necesitan saber a quién editar/borrar)
router.put('/:id', updateProductora);
router.delete('/:id', deleteProductora);

module.exports = router;