var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
require('express-async-errors');

// connect to DB
const db = require('./database');
db.connectDB();

var app = express();

var corsOptions = {
    origin: "*"
  };
  
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
var router = require('express-convention-routes');

console.log (__dirname);
router.load(app, {
    // Defaults to "./controllers" but showing for example
    routesDirectory: './controllers', 

    // Root directory where your server is running
    rootDirectory: __dirname,
    
    //Root url of partial convention routes ('/api/ for instance')
    // Defaults to '/'
    rootDirectory: '../../',
    
    // Do you want the created routes to be shown in the console?
    logRoutes: true
});

app.use(function(req, res, next) {
    res.end("Didn't match a route!");
    next();
  });

  app.use(function(err, req, res, next) {
    res.status(500).send({ error: 0, message: err.message });
  });


module.exports = app;
