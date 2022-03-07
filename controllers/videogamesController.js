const videogameModel = require('../models/videogameModel');

module.exports = {
  getAll: (req, res) => {
    videogameModel.find( (err, data) => {
      if(err){
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  },
  getById: (req, res) => {
    videogameModel.findById((req.params.id), (err, data) => {
      if(err){
        res.status(500).send(err);
      }else{
        res.status(200).send(data);
      }
    })
  },
  create: (req, res) => {
    const videogame = new videogameModel({
      name: req.body.name,
      year: req.body.year,
      publisher: req.body.publisher,
      genre: req.body.genre
    });

    videogame.save((err, data) => {
      if(!err) {
        res.status(200).send('Videogame Created Successfully!');
      } else {
        res.status(500).send('Erorr while saving videogame on database');
      }
    })
  },
  updateById: (req, res) => {
    videogameModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        year: req.body.year,
        publisher: req.body.publisher,
        genre: req.body.genre,
      },
      (err, data) => {
        if(err) {
          res.status(500).send(err);
        } else {
          res.status(200).send('Videogame updated sucessfully!');
        }
      }
    );
  }
};