var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
require('express-async-errors');
const auth = require('./common/auth');

// connect to DB
const db = require('./database');
db.connectDB();

var app = express();

var corsOptions = {
  origin: '*'
};

app.use(cors(corsOptions));

var rawBodySaver = function (req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.raw({ verify: rawBodySaver, type: function () { return true } }));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
var router = require('express-convention-routes');

app.use((req, res, next) => {
  console.log(
    ' ============================== ' +
      req.url +
      ' =============================='
  );
  console.log('Header : ' + JSON.stringify(req.headers));
  console.log('Body : ' + JSON.stringify(req.body));
  console.log(
    ' ============================================================================ '
  );
  next();
});

app.use((req, res, next) => {
  if (req.url == '/' || req.url == '/login') {
    return next();
  }
  auth(req, res, next);
});

router.load(app, {
  // Defaults to "./controllers" but showing for example
  routesDirectory: './controllers',

  // Root directory where your server is running
  rootDirectory: __dirname,

  //Root url of partial convention routes ('/api/ for instance')
  // Defaults to '/'
  rootUrl: '/',

  // Do you want the created routes to be shown in the console?
  logRoutes: true
});

app.use(function (req, res, next) {
  res.end("Didn't match a route!");
  next();
});

app.use(function (err, req, res, next) {
  res.status(500).send({ error: 0, message: err.message });
});

module.exports = app;
