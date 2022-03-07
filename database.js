const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true});

let connection = mongoose.connection;

connection.on('connected', function() {
    console.log('database is connected successfully');
});

connection.on('disconnected',function(){
    console.log('database is disconnected successfully');
});

connection.on('error', console.error.bind(console, 'connection error:'));

module.exports = connection;
