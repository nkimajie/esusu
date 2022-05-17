const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateAccessToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET_TOKEN, { expiresIn: '2h' });
};


module.exports = { generateAccessToken };