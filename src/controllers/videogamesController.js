const videogameModel = require('../models/videogameModel');
const sendMessage = require('../tools/sqs');

async function getAll(req, res) {
  videogameModel.find(async (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const messageParams = {
        title: 'Get All',
        group: 'GetAll',
        message: data.toString(),
      };

      await sendMessage(messageParams);
      res.status(200).send(data);
    }
  });
}

async function getById(req, res) {
  videogameModel.findById((req.params.id), async (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const messageParams = {
        title: 'Get by id',
        group: 'GetById',
        message: JSON.stringify(data),
      };

      await sendMessage(messageParams);
      res.status(200).send(data);
    }
  });
}

async function create(req, res) {
  const {
    name, year, publisher, genre,
  } = req;
  const videogame = new videogameModel({
    name,
    year,
    publisher,
    genre,
  });

  videogame.save(async (err, data) => {
    if (!err) {
      const messageParams = {
        title: 'Create',
        group: 'Create',
        message: JSON.stringify(data),
      };

      await sendMessage(messageParams);
      res.status(200).send('Videogame Created Successfully!');
    } else {
      res.status(500).send('Erorr while saving videogame on database');
    }
  });
}

async function updateById(req, res) {
  const {
    name, year, publisher, genre,
  } = req.body;
  const { id } = req.params;

  videogameModel.findByIdAndUpdate(
    id,
    {
      name,
      year,
      publisher,
      genre,
    },
    async (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        const messageParams = {
          title: 'UpdateById',
          group: 'Update',
          message: JSON.stringify(data),
        };

        await sendMessage(messageParams);
        res.status(200).send('Videogame updated sucessfully!');
      }
    },
  );
}

module.exports = {
  getAll, getById, create, updateById,
};
