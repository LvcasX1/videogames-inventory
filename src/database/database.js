const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

const { connection } = mongoose;

connection.on('connected', () => {
  console.log('database is connected successfully');
});

connection.on('disconnected', () => {
  console.log('database is disconnected successfully');
});

connection.on('error', console.error.bind(console, 'connection error:'));

module.exports = connection;
