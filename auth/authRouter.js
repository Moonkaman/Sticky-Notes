const router = require('express').Router();

const db = require('../data/helpers/stickyDb');

router.get('/users', (req, res) => {
  db.get('users')
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({message: 'Could not retrieve list of users at this time', err}));
})

module.exports = router;