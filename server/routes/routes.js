var express = require('express');
var { registerController, loginController } = require('../controllers/authControllers.js');

const router = express.Router();

router.post('/register', registerController);

router.post('/login', loginController);

module.exports = router;

