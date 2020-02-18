const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;


const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://rootuser:rootuser@cluster0-zffv3.mongodb.net/test?retryWrites=true&w=majority'
  )
    .then(client => {
      console.log('Connected to MongoDb!');
      callback(client);
    })
    .catch(err => console.log('Err:', err));
}


module.exports = mongoConnect;






// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');

// var db = mongoose.connection;

// db.on('error', function() {
//   console.log('mongoose connection error');
// });

// db.once('open', function() {
//   console.log('mongoose connected successfully');
// });

// var itemSchema = mongoose.Schema({
//   quantity: Number,
//   description: String
// });

// var Item = mongoose.model('Item', itemSchema);

// var selectAll = function(callback) {
//   Item.find({}, function(err, items) {
//     if(err) {
//       callback(err, null);
//     } else {
//       callback(null, items);
//     }
//   });
// };

// module.exports.selectAll = selectAll;