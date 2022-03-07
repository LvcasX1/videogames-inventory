const videogameModel = require('../models/videogameModel');
const sendMessage = require('../tools/sqs');

module.exports = {
  getAll: (req, res) => {
    videogameModel.find( (err, data) => {
      if(err){
        res.status(500).send(err);
      } else {
        const messageParams = {
          title: 'Get All',
          group: 'GetAll',
          message: data.toString()
        }

        try{
          sendMessage(messageParams)
          res.status(200).send(data);
        } catch(err) {
          res.status(500);
        }
      }
    });
  },
  getById: (req, res) => {
    videogameModel.findById((req.params.id), (err, data) => {
      if(err){
        res.status(500).send(err);
      }else{
        const messageParams = {
          title: 'Get by id',
          group: 'GetById',
          message: JSON.stringify(data)
        }

        try{
          sendMessage(messageParams);
          res.status(200).send(data);
        } catch(err) {
          res.status(500).send(err);
        }
      }
    })
  },
  create: (req, res) => {
    const { name, year, publisher, genre } = req;
    const videogame = new videogameModel({
      name,
      year,
      publisher,
      genre
    });

    videogame.save((err, data) => {
      if(!err) {
        const messageParams = {
          title: 'Create',
          group: 'Create',
          message: JSON.stringify(data)
        }

        try{
          sendMessage(messageParams)
          res.status(200).send('Videogame Created Successfully!');
        } catch(err) {
          res.status(500).send(err);
        }      
      } else {
        res.status(500).send('Erorr while saving videogame on database');
      }
    })
  },
  updateById: (req, res) => {
    const { name, year, publisher, genre } = req.body;
    const id = req.params.id;
    
    videogameModel.findByIdAndUpdate(
      id,
      {
        name,
        year,
        publisher,
        genre,
      },
      (err, data) => {
        if(err) {
          res.status(500).send(err);
        } else {
          const messageParams = {
            title: 'UpdateById',
            group: 'Update',
            message: JSON.stringify(data)
          }

          try{
            sendMessage(messageParams)
            res.status(200).send('Videogame updated sucessfully!');
          } catch(err) {
            res.status(500).send(err);
          }
        }
      }
    );
  }
};