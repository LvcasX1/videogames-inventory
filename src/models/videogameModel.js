const mongoose = require('../../database');
const { Schema } = require('mongoose');

const videogameSchema = new Schema({
  name: String,
  year: Number,
  publisher: String,
  genre: String,
});

const videogameModel = mongoose.model('videogames', videogameSchema);

module.exports = videogameModel