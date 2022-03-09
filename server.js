require('dotenv').config();
require('express-async-errors');
const express = require('express');
const checkToken = require('./src/auth/checkJwtToken');

const port = process.env.PORT;
const validationErrorMiddleware = require('./src/middlewares/validationErrorMiddleware');

const app = express();

app.use(express.json());
app.use(checkToken);
app.use('/', require('./routes'));

app.use(validationErrorMiddleware);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Success! Your aplication is running on port ${port}`);
});

module.exports = app;
