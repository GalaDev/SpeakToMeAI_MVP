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
        return res.send(JSON.stringify({ isLoggedIn: false }));
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
          const { name, savedReports } = result;
          let newResult = { name, savedReports, isLoggedIn: true };
          newResult = JSON.stringify(newResult);

          res.end(newResult);
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
        return res.send(JSON.stringify({ isLoggedIn: false }))
      }

      //Compares input pw to pw stored in DB
      //Return a promise
      bcrypt.compare(pw, user.pw)
        .then(doMatch => {
          if (doMatch) {
            //change value of isLoggedIn object on client
            console.log('success, loggedin')
            const { name, savedReports } = user;
            let userData = { name, savedReports, isLoggedIn: true };

            return res.send(JSON.stringify(userData))
          }
          console.log('username found but password incorrect')
          return res.send(JSON.stringify({ isLoggedIn: false }))
        })
        .catch(err => {
          console.log(err);
          res.send(JSON.stringify({ isLoggedIn: false }))
        })
    })
};

module.exports = {
  registerController,
  loginController
};