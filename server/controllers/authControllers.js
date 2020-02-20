const User = require('../models/User.js');
const bcrypt = require('bcryptjs');


const registerController = (req, res) => {
  let { name, email, username, pw } = req.body;

  if (!name || !email || !username || !pw) {
    return res.send('false')
  }

  console.log('input email', email)
  email = email.toLowerCase();

  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        console.log(userDoc)
        console.log('User already exists')
        return res.send('false');
      }

      return bcrypt.hash(pw, 12)
        .then(hashedPw => {
          const user = new User({
            name: name,
            email: email,
            username: username,
            pw: hashedPw,
            savedReports: []
          });

          return user.save();
        })
        .then(result => {
          console.log('New user created')
          res.end('true');
        })
    })
    .catch(err => {
      console.log(err)
    });
};

const loginController = (req, res) => {
  const { username, pw } = req.body;
  console.log('username from client', username)
  User.findOne({ username: username })
    .then(user => {
      if (!user) {
        console.log('user not found')
        return res.send('false')
      }

      //Compares input pw to pw stored in DB
      //Return a promise
      bcrypt.compare(pw, user.pw)
        .then(doMatch => {
          if (doMatch) {
            //change value of isLoggedIn object on client
            console.log('success, loggedin')
            return res.send('true')
          }
          console.log('username found but password incorrect')
          return res.send('false')
        })
        .catch(err => {
          console.log(err);
          res.send('false')
        })
    })
};

module.exports = {
  registerController,
  loginController
};