const jwt = require('express-jwt');

const checkToken = jwt({
	secret: process.env.JWT_SECRET,
	algorithms: ['HS256']
})

module.exports = checkToken;