var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var authRoutes = require('./routes/routes.js');

//Connect to mongoDb
var mongoConnect = require('./database-mongo/database.js').mongoConnect;

//Creates server
var app = express();

//Allows use of req.body object
app.use(bodyParser.urlencoded({ extended: true }));

//Allows json on req.body object
app.use(express.json());

//Serves compiled html/react file from client
app.use(express.static(__dirname + '/../react-client/dist'));

//Refereces post requests from client from routes/routes.js file
app.use(authRoutes)


//Initializes MongoDb
mongoConnect(() => {


  //Runs server
  app.listen(3000, () => {
    console.log('listening on port 3000')
  })
})