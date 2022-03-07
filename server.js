const { ValidationError } = require('express-json-validator-middleware');
const express = require('express');
const app = express();
const port = 3000;

function validationErrorMiddleware(error, request, response, next) {
	if (response.headersSent) {
		return next(error);
	}

	const isValidationError = error instanceof ValidationError;
	if (!isValidationError) {
		return next(error);
	}

	response.status(400).json({
		errors: error.validationErrors,
	});

	next();
}

app.use(express.json());
app.use('/', require('./routes'));
app.use(validationErrorMiddleware);

app.listen(port, () => {
	console.log(`Success! Your aplication is running on port ${port}`);
});
