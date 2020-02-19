var express = require('express');
var { saveReportController, getReportsController } = require('../controllers/mainPageControllers.js');

const router = express.Router();

router.post('/main-page', saveReportController);

router.get('/main-page', getReportsController);


module.exports = router;