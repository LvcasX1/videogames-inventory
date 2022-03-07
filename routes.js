const express = require('express');
const router = express.Router();
const { Validator } = require('express-json-validator-middleware');

const videogamesController = require('./controllers/videogames-controller');

const { validate } = new Validator();

const videogamesSchema = require('./schemas/videogames-schema');

router.get('/', videogamesController.getAll);
router.get('/:id', videogamesController.getById);
router.post('/', validate({ body: videogamesSchema }), videogamesController.create);
router.put('/:id', validate({ body: videogamesSchema }), videogamesController.updateById);

module.exports = router;