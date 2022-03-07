const express = require('express');
const { Validator } = require('express-json-validator-middleware');
const videogamesController = require('./src/controllers/videogamesController');
const videogamesSchema = require('./src/schemas/videogamesSchema');

const { validate } = new Validator();
const router = express.Router();

router.get('/', videogamesController.getAll);
router.get('/:id', videogamesController.getById);
router.post('/', validate({ body: videogamesSchema }), videogamesController.create);
router.put('/:id', validate({ body: videogamesSchema }), videogamesController.updateById);

module.exports = router;