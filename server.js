require('dotenv').config();
require('express-async-errors');
const express = require('express');
const jwt = require('express-jwt');
const port = process.env.PORT;
const validationErrorMiddleware = require('./src/tools/validationErrorMiddleware');

const app = express();

const checkToken = jwt({
	secret: process.env.JWT_SECRET,
	algorithms: ['HS256']
})

app.use(express.json());
app.use(checkToken);
app.use('/', require('./routes'));
app.use(validationErrorMiddleware);

app.listen(port, () => {
	console.log(`Success! Your aplication is running on port ${port}`);
});
