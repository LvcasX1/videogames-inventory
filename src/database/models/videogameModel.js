const { Schema } = require('mongoose');
const mongoose = require('../database');

const videogameSchema = new Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  publisher: { type: String, required: true },
  genre: { type: String, required: true },
});

const videogameModel = mongoose.model('videogames', videogameSchema);

module.exports = videogameModel;
