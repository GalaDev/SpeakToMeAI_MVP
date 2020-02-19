const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reportSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  inputData: {
    type: String,
    required: true
  },
  reportData: {
    type: Object,
    required: false
  }
})

module.exports = mongoose.model('Report', reportSchema);