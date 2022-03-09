/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../../server');

const request = supertest(app);
const VideogameModel = require('../database/models/videogameModel');

describe('Videogames controller test', () => {
  const headers = {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.lvkSTrm9sH-FHO0VDjjk81Um_xg8pHg-MqsMSXxeHlM',
  };

  const videogameMock = {
    name: 'Persona',
    year: 2022,
    publisher: 'atlus',
    genre: 'jrpg',
  };

  beforeAll(async () => {
    await mongoose.connect(
      process.env.DB_URL,
      { useNewUrlParser: true, useCreateIndex: true },
      (error) => {
        if (error) {
          console.error(error);
          process.exit(1);
        }
      },
    );
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a videogame', async () => {
    await request.post('/').set(headers).send(videogameMock);

    const videogame = await VideogameModel.findOne({ name: videogameMock.name });

    expect(videogame.name).toBe(videogameMock.name);
    expect(videogame.genre).toBeTruthy();
  });

  it('should update a videogame', async () => {
    const randomName = Math.random().toString(16).substring(2, 8);
    const randomNewName = Math.random().toString(16).substring(2, 8);
    const videogame = { ...videogameMock };
    videogame.name = randomName;

    const updatedVideogame = { ...videogameMock };
    updatedVideogame.name = randomNewName;

    await request.post('/').set(headers).send(videogame);

    const savedVideogame = await VideogameModel.findOne({ name: randomName });
    const savedVideogameId = savedVideogame._id.toString();

    await request.put(`/${savedVideogameId}`).set(headers).send(updatedVideogame);

    const savedUpdatedVideoGame = await VideogameModel.findOne({ name: randomNewName });

    expect(savedUpdatedVideoGame.name).toBe(randomNewName);
    expect(savedUpdatedVideoGame.genre).toBe(videogameMock.genre);
  });
});
