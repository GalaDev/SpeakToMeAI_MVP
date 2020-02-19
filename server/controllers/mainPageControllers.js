const Product = require('../models/Report.js');


const saveReportController = (req, res) => {
  const { title, inputData, reportData } = req.body;

  const report = new Report({
    title: title,
    inputData: inputData,
    reportData: reportData
  });


  report
    .save()
    .then(report => {
      console.log('Report saved to Database!');
      res.send('Report saved, from server');
    })
    .catch(err => {
      console.log("Err", err);
    });
};

const getReportsController = (req, res) => {
  res.end();
}

module.exports = {
  saveReportController,
  getReportsController
};