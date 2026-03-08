const { Router } = require('express');
const { getMedias, createMedia, updateMedia, deleteMedia } = require('../controllers/mediaController');

const router = Router();

// Obtener todas las películas/series
router.get('/', getMedias);

// Crear una película/serie
router.post('/', createMedia);

// Actualizar 
router.put('/:id', updateMedia);

// Borrar 
router.delete('/:id', deleteMedia);

module.exports = router;