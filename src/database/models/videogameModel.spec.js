/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const mongoose = require('mongoose');
const VideogameModel = require('./videogameModel');

describe('Videogame Model Test', () => {
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

  it('create and save a videogame', async () => {
    const validVideogame = new VideogameModel(videogameMock);
    const savedVideogame = await validVideogame.save();

    expect(savedVideogame._id).toBeDefined();
    expect(savedVideogame.name).toBe(videogameMock.name);
    expect(savedVideogame.year).toBe(videogameMock.year);
    expect(savedVideogame.publisher).toBe(videogameMock.publisher);
    expect(savedVideogame.genre).toBe(videogameMock.genre);
  });

  it('create user and properties not defined in schema should be undefined', async () => {
    const videogaeWithInvalidProperty = new VideogameModel(
      {
        name: 'Dragon Ball Z Hyper Dimension',
        description: 'amazing fighting game',
        year: '1997',
        genre: 'fighting',
        publisher: 'Bandai',
      },
    );

    const savedVideogameWithInvalidProperty = await videogaeWithInvalidProperty.save();

    expect(savedVideogameWithInvalidProperty._id).toBeDefined();
    expect(savedVideogameWithInvalidProperty.description).toBeUndefined();
  });

  it('should fail when creating a videogame withuot required properties', async () => {
    const videogameWithoutRequiredField = new VideogameModel({ name: 'Phantasy Star' });
    let err;

    try {
      const savedVideogameWithoutREquiredField = await videogameWithoutRequiredField.save();
      error = savedVideogameWithoutREquiredField;
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.genre).toBeDefined();
    expect(err.errors.year).toBeDefined();
    expect(err.errors.publisher).toBeDefined();
  });
});
