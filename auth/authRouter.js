const router = require('express').Router();
const bcrypt = require('bcryptjs');

const db = require('../data/helpers/stickyDb');
const generateToken = require('../config/tokenServices');
const restricted = require('./restricted');

router.get('/users', restricted, (req, res) => {
  db.get('users')
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({message: 'Could not retrieve list of users at this time', err}));
})

router.post('/register', (req, res) => {
  if(req.body.username && req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 14);
    db.add('users', req.body)
      .then(id => res.status(201).json({message: 'Successfully registered!', id: id[0]}))
      .catch(err => {
        if(err.errno = 19) {
          res.status(400).json({message: 'This username has already been taken'});
        } else {
          res.status(500).json({message: 'Could not register at this time', err})
        }
      });
  } else {
    res.status(400).json({message: 'Please provide a username and password'});
  }
})

router.post('/login', (req, res) => {
  if(req.body.username && req.body.password) {
    db.findUserBy({username: req.body.username})
      .then(user => {
        if(user && bcrypt.compareSync(req.body.password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({message: `Successfully Logged In, Welcome ${user.username}!`, token})
        } else {
          res.status(401).json({message: 'Invalid Credentials'});
        }
      })
  } else {
    res.status(400).json({message: 'Please provide a username and password'});
  }
})

module.exports = router;