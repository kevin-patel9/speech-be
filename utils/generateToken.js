const jwt = require('jsonwebtoken');

const generateToken = (uid) => {
    return jwt.sign({ uid }, process.env.JWT_SECRET)
};

module.exports = generateToken;