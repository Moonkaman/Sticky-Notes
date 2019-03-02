const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'default secret';

function generateToken(user){
  const payload = {
    subject: user.id,
    username: user.username,
  }

  const options = {
    expiresIn: '1h'
  }

  return jwt.sign(payload, secret, options);
}

module.exports = generateToken;