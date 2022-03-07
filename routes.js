const express = require('express');
const router = express.Router();
const { Validator } = require('express-json-validator-middleware');

const baseController = require('./controllers/base-controller');

const { validate } = new Validator();

const videogamesSchema = require('./schemas/videogames-schema');

router.get('/', baseController.getAll);
router.get('/:id', baseController.getById);
router.post('/', validate({ body: videogamesSchema }), baseController.create);
router.put('/:id', validate({ body: videogamesSchema }), baseController.updateById);

module.exports = router;