const getDb = require('../database-mongo/database.js').getDb;

class User {
  constructor(
    name,
    email,
    username,
    pw
  ) {
    this.name = name;
    this.email = email;
    this.username = username;
    this.pw = pw;
  }

  save() {
    const db = getDb();
    return db.collection('users')
      .insertOne(this)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err)
      })
  }

  static fetchAll() {
    const db = getDb();

    return db.collection('users')
      .find()
      .toArray()
      .then(users => {
        console.log("USERS:", users);
        return users;
      })
      .catch(err => {
        console.log('Err:', err);
      })
  }
}

module.exports = User;