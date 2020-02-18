const User = require('../models/User.js');

const registerController = (req, res) => {
  const { name, email, username, pw } = req.body;
  const user = new User(name, email, username, pw);
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
      if (isNewUser) {
        return user.save()
          .then(user => {
            console.log('New User Registred!');
            res.send('New User Registered, message from server');
          })
      } else {
        console.log('User already exists!')
        res.send('User already exists, message from server')
      }
    })
    .catch(err => {
      console.log('err', err);
    });
};

const loginController = (req, res) => {
  console.log(req.body);
  res.send('From login')
};

module.exports = {
  registerController,
  loginController
};