const express = require('express');
const { Validator } = require('express-json-validator-middleware');
const { getAll, getById, create, updateById } = require('./src/controllers/videogamesController');
const videogamesSchema = require('./src/schemas/videogamesSchema');

const { validate } = new Validator();
const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', validate({ body: videogamesSchema }), create);
router.put('/:id', validate({ body: videogamesSchema }), updateById);

module.exports = router;