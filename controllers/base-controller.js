const videogameModel = require('../models/videogameModel');

module.exports = {
  getAll: (req, res) => {
    res.send(req.params);
  },
  getById: (req, res) => {
    res.send(req.params.id);
  },
  create: (req, res) => {
    const videogame = new videogameModel({
      name: req.body.name,
      year: req.body.year,
      publisher: req.body.publisher,
      genre: req.body.genre
    });

    videogame.save((error, doc) => {
      if(!error) {
        res.send('Videogame Created Successfully!');
      } else {
        res.status(500).send('Erorr while saving videogame on database');
      }
    })
  },
  updateById: (req, res) => {
    res.send(req.params.id);
  }
};