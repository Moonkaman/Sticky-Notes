const router = require('express').Router();

const db = require('../data/helpers/stickyDb');

const restricted = require('../auth/restricted');

router.use(restricted);

router.get('/', (req, res) => {
  db.getUsersBoards(req.decoded.subject)
    .then(boards => res.status(200).json(boards))
    .catch(err => res.status(500).json({message: 'Could not retrieve users boards at this time', err}));
})

router.post('/', (req, res) => {
  if(req.body.title) {
    req.body.user_id = req.decoded.subject;
    db.add('boards', req.body)
      .then(id => res.status(201).json({message: 'Successfully created a new board', id: id[0]}))
      .catch(err => res.status(500).json({message: 'Could not create a new board at this time', err}));
  } else {
    res.status(400).json({message: 'Please provide a title'});
  }
})

router.put('/:id', (req, res) => {
  if(req.body.title && req.body.title !== '') {
    db.get('boards', req.decoded.subject)
      .then(board => {
        console.log(typeof req.params.id);
        console.log(typeof board.user_id)
        if(board.user_id === req.decoded.subject) {
          db.update('boards', req.params.id, req.body)
          .then(count => {
            if(count > 0) {
              db.get('boards', req.decoded.subject)
                .then(board => res.status(200).json(board))
                .catch(err => res.status(500).json({message: 'Could not retrieve the updated user at this time'}));
            } else {
              res.status(404).json({message: 'The board with the specified string was not found'});
            }
          })
        } else {
          res.status(401).json({message: 'This borad does not belong to you'});
        }
      })
      .catch(err => res.status(500).json({message: 'Could not update the board with the specified ID at this time', err}));
  } else {
    res.status(400).json({message: 'Please provide a title'});
  }
})

router.delete('/:id', (req, res) => {
  db.get('boards', req.params.id)
    .then(board => {
      if(board.user_id === req.decoded.subject) {
        db.remove('boards', req.params.id)
        .then(count => {
          if(count > 0) {
            res.status(204).end();
          } else {
            res.status(404).json({message: 'The board you tried to delete was not found'});
          }
        })
        .catch(err => res.status(500).json({message: 'Could not delete this board at this time', err}));
      } else {
        res.status(401).json({message: 'The board you tried to delete is not yours'});
      }
    })

})

module.exports = router;