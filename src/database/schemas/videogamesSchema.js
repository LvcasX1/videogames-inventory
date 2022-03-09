module.exports = {
  type: 'object',
  required: ['name', 'year', 'publisher', 'genre'],
  properties: {
    name: {
      type: 'string',
      minLength: 1,
    },
    year: {
      type: 'integer',
      minimum: 1956,
    },
    publisher: {
      type: 'string',
      minLength: 1,
    },
    genre: {
      type: 'string',
      minLength: 1,
    },
  },
};
