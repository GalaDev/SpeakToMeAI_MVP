const { User, Report } = require('../models/User.js');
const language = require('@google-cloud/language');
const client = new language.LanguageServiceClient();

const saveReportController = (req, res) => {
  let reqObj = req.body

  let { username, inputData, title } = reqObj;

  const document = {
    content: inputData,
    type: 'PLAIN_TEXT'
  };

  client.analyzeSentiment({ document: document })
    .then(result => {
      let score = result[0].documentSentiment.score
      return score;
    })
    .then(score => {
      User.findOne({ username: username })
        .then(user => {

          const newReport = new Report({
            title: title,
            inputData: inputData,
            score: score
          });

          user.savedReports.push(newReport);
          user.save();
          return user.savedReports
        })
        .then(updatedSavedReports => {
          res.send(JSON.stringify({ savedReports: updatedSavedReports, score: score }))
        })
    })
    .catch(err => {
      console.log(err);
    })
};

const getReportsController = (req, res) => {
  res.end();
}

module.exports = {
  saveReportController,
  getReportsController
};