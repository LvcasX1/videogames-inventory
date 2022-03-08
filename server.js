require('dotenv').config();
require('express-async-errors');
const checkToken = require('./src/tools/checkJwtToken');
const express = require('express');
const port = process.env.PORT;
const validationErrorMiddleware = require('./src/tools/validationErrorMiddleware');

const app = express();

app.use(express.json());
app.use(checkToken);
app.use('/', require('./routes'));
app.use(validationErrorMiddleware);

app.listen(port, () => {
	console.log(`Success! Your aplication is running on port ${port}`);
});
