const router = require('express').Router();

const db = require('../data/helpers/stickyDb');
const restricted = require('../auth/restricted');

router.use(restricted);

router.get('/', (req, res) => {
  db.getUsersFriends(req.decoded.subject)
    .then(friends => res.status(200).json(friends))
    .catch(err => res.status(500).json({message: 'There was a problem retrieving your list of friends', err}));
})

router.post('/', (req, res) => {
  if(req.body.friend_id) {
    req.body.user_id = req.decoded.subject;
    db.add('friends', req.body)
      .then(id => res.status(201).json({message: 'Successfully Added Freind', id: id[0]}))
      .catch(err => res.status(500).json({message: 'There was a problem adding a freind'}));
  } else {
    res.status(400).json({message: 'Please provide a valid friend ID'})
  }
})

module.exports = router;