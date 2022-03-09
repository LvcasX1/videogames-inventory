const videogameModel = require('../database/models/videogameModel');
const { sendCreateEvent, sendUpdateEvent, sendDeleteEvent } = require('../events/eventSender');

async function getById(req, res) {
  const videogame = await videogameModel.findById(req.params.id);
  return res.status(200).send(videogame);
}

async function create(req, res) {
  const {
    name, year, publisher, genre,
  } = req.body;

  const videogame = new videogameModel({
    name,
    year,
    publisher,
    genre,
  });

  await videogame.save();
  await sendCreateEvent(videogame);

  res.status(201).send('Videogame created successfully!');
}

async function updateById(req, res) {
  const {
    name, year, publisher, genre,
  } = req.body;
  const { id } = req.params;

  const updatedVideogame = await videogameModel.findByIdAndUpdate(
    id,
    {
      name,
      year,
      publisher,
      genre,
    },
  );

  await sendUpdateEvent(updatedVideogame);
  res.status(200).send('Videogame updated successfully!');
}

async function deleteById(req, res) {
  const { id } = req.params;

  const videogame = await videogameModel.findByIdAndDelete(id);

  await sendDeleteEvent(videogame);
  res.status(204).send('Videogame deleted successfully!');
}

module.exports = {
  getById, create, updateById, deleteById,
};
