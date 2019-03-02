const db = require('../dbConfig');

module.exports = {
  get,
  add,
  remove,
  findUserBy
}

function get(table, id) {
  if(id) {
    return db(table).where({id: id}).first();
  } else {
    return db(table);
  }
}

function add(table, item) {
  return db(table).insert(item);
}

function remove(table, id) {
  return db(table).where({id: id}).del();
}

function findUserBy(filter) {
  return db(table).where(filter).first();
}