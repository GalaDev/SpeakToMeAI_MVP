const User = require('../models/User.js');


const saveReportController = (req, res) => {

  let { username, savedReports, isLoggedIn } = req.body;
  savedReports = JSON.parse(savedReports);

  User.findOneAndUpdate({ username: username }, { savedReports: savedReports })
    .then(result => {
      res.end("success");
    })
    .catch(err => {
      console.log(err)
    })

  res.send(JSON.stringify({ isLoggedIn: true }))


};

const getReportsController = (req, res) => {
  res.end();
}

module.exports = {
  saveReportController,
  getReportsController
};