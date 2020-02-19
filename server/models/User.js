/*
================================================================
MONGOOOSE SETUP
================================================================
*/

const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  pw: {
    type: String,
    required: true
  },
  savedReports: {
    type: Array,
    required: true
  }
});

// userSchema.methods.generateHash = function (password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// userSchema.methods.validPassword = function (password) {
//   return bcrypt.compareSync(password, this.password);
// };


module.exports = mongoose.model('User', userSchema);

/*
================================================================
MONGO DB SETUP
================================================================
*/
// const getDb = require('../database-mongo/database.js').getDb;

// class User {
//   constructor(
//     name,
//     email,
//     username,
//     pw
//   ) {
//     this.name = name;
//     this.email = email;
//     this.username = username;
//     this.pw = pw;
//   }

//   save() {
//     const db = getDb();
//     return db.collection('users')
//       .insertOne(this)
//       .then(result => {
//         console.log(result);
//       })
//       .catch(err => {
//         console.log(err)
//       })
//   }

//   static fetchAll() {
//     const db = getDb();

//     return db.collection('users')
//       .find()
//       .toArray()
//       .then(users => {
//         console.log("USERS:", users);
//         return users;
//       })
//       .catch(err => {
//         console.log('Err:', err);
//       })
//   }
// }

// module.exports = User;