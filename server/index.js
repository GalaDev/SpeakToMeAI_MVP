var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var authRoutes = require('./routes/authRoutes.js');
var mainPageRoutes = require('./routes/mainPageRoutes.js');

//Connect to mongoDb
// var mongoConnect = require('./database-mongo/database.js').mongoConnect;

//Connect with mongoose
const mongoose = require('mongoose');

//Creates server
var app = express();

//Allows use of req.body object
app.use(bodyParser.urlencoded({ extended: true }));

//Allows json on req.body object
app.use(express.json());

//Serves compiled html/react file from client
app.use(express.static(__dirname + '/../react-client/dist'));

//Refereces get/post requests from client from routes/routes.js file
app.use(authRoutes);
app.use(mainPageRoutes);


//Initializes MongoDb
// mongoConnect(() => {

//   //Runs server
//   app.listen(3000, () => {
//     console.log('listening on port 3000')
//   })
// })

//Initializes Mongoose
mongoose.connect('mongodb+srv://rootuser:rootuser@cluster0-zffv3.mongodb.net/root?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true })
  .then(result => {
    app.listen(3000, () => {
      console.log('listening on port 3000');
    })
  })
  .catch(err => {
    console.log("ERROR", err);
  });