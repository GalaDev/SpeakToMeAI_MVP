const User = require('../models/User.js');
const bcrypt = require('bcryptjs');


const registerController = (req, res) => {
  let { name, email, username, pw } = req.body;

  if (!name || !email || !username || !pw) {
    return res.end({
      success: false,
      message: 'Error, missing fields!'
    })
  }

  email = email.toLowerCase();

  //Steps
  //Verify email does not exist
  //Save

  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        console.log('User already exists')
        return res.end("true");
      }

      return bcrypt.hash(pw, 12)
    })
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
    .catch(err => {
      console.log(err)
    })





  // user
  //   .save()
  //   .then(user => {
  //     console.log('New User Registred!');
  //     res.send('New User Registered, message from server');
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
};

const loginController = (req, res) => {
  const { username, pw } = req.body;

  User.fetchAll()
    .then(users => {
      let isNewUser = true;

      for (let user of users) {
        if (user.username === username && user.pw === pw) {
          isNewUser = false;
        }
      }

      return isNewUser;
    })
    .then(isNewUser => {
      if (!isNewUser) {
        res.send({ isLoggedIn: true })
      }
    })

  res.send('From login')
};

module.exports = {
  registerController,
  loginController
};