const db = require('../dbConfig');

module.exports = {
  get,
  add,
  remove,
  findUserBy,
  findUserByID,
  getUsersBoards,
  update
}

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

function getUsersBoards(userID){
  return db('boards').where({user_id: userID});
}