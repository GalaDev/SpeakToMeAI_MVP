const registerController = (req, res) => {
  console.log(req.body);
  res.send({ isLoggedIn: true });
};

const loginController = (req, res) => {
  console.log(req.body);
  res.send('From login')
};

module.exports = {
  registerController,
  loginController
};