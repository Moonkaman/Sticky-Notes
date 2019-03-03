const db = require('../dbConfig');

module.exports = {
  get,
  add,
  remove,
  findUserBy,
  findUserByID,
  getUsersBoards,
  update,
  getUsersFriends
}

//##################### GENERAL HELPERS ######################################\\

function get(table, id) {
  if(id) {
    return db(table).where({id: id}).first();
  } else {
    return db(table);
  }
}

function update(table, id, content) {
  return db(table).where({id: id}).update(content);
}

function add(table, item) {
  console.log(item);
  return db(table).insert(item);
}

function remove(table, id) {
  return db(table).where({id: id}).del();
}

//##################### AUTH HELPERS ######################################\\

function findUserByID(id){
  return db('users').where({id: id}).first()
    .then(user => {
      return {
        ...user,
        boards: getUsersBoards(id).then(boards => boards)
      }
    })
}

function findUserBy(filter) {
  return db('users').where(filter).first();
}

//##################### BOARDS HELPERS ######################################\\

function getUsersBoards(userID) {
  return db('boards').where({user_id: userID});
}

//##################### FRIENDS HELPERS ######################################\\

function getUsersFriends(userID) {
  return db().select('u.id as id', 'u.username as Username').from('friends as f').innerJoin('users as u', 'f.user_id', 'u.id').where({'f.user_id': userID});
}