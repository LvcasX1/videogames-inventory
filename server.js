const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(req, res){
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`Success! Your aplication is running on port ${port}`)
});
