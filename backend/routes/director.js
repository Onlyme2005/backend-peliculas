const {Router} = require('express');

const {getDirectores, createDirector} = require('../controllers/directorController');

const router = Router();

router.get('/', getDirectores);

router.post('/', createDirector);

module.exports = router;