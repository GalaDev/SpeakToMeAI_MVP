const User = require('../models/User.js');
const bcrypt = require('bcryptjs');


const registerController = (req, res) => {
  let { name, email, username, pw } = req.body;

  if (!name || !email || !username || !pw) {
    return res.send('false')
  }

  email = email.toLowerCase();

  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
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
  const { email, pw } = req.body;

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.send('false')
      }

      //Compares input pw to pw stored in DB
      //Return a promise
      bcrypt.compare(pw, user.pw)
        .then(doMatch => {
          if (doMatch) {
            //change value of isLoggedIn object on client
            return res.send('true')
          }

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