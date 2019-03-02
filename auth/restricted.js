const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'default secret';

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if(token) {
    jwt.verify(token, secret, (err, decoded) => {
      if(err) {
        return res.status(401).json({message: 'Modified Token', err});
      } else {
        req.decoded = decoded;
        next();
      }
    })
  } else {
    return res.status(401).json({message: 'Please Log In'});
  }
}

module.exports = restricted;