const router = require('express').Router();
const bcrypt = require('bcryptjs');

const db = require('../data/helpers/stickyDb');

router.get('/users', (req, res) => {
  db.get('users')
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({message: 'Could not retrieve list of users at this time', err}));
})

router.post('/register', (req, res) => {
  if(req.body.username && req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 14);
    db.add('users', req.body)
      .then(id => res.status(201).json({message: 'Successfully registered!', id: id[0]}))
      .catch(err => res.status(500).json({message: 'Could not register at this time', err}));
  } else {
    res.status(400).json({message: 'Please provide a username and password'});
  }
})

module.exports = router;