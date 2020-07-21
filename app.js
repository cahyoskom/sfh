const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
require('express-async-errors');

const auth = require('./common/authorization');
require('./database').connectDB();

const app = express();
app.use(cors({ origin: '*' }));

const rawBodySaver = function (req, res, buf, encoding) {
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
app.use((req, res, next) => {
  console.log('URL : ' + req.url);
  console.log('Header : ' + JSON.stringify(req.headers));
  console.log('Body : ' + JSON.stringify(req.body));
  next();
});
app.use((req, res, next) => {
  if (req.url == '/' || req.url == '/login'|| req.url == '/login_google') {
    return next();
  }
  auth(req, res, next);
});

const router = require('express-convention-routes');
router.load(app, {
  routesDirectory: './routes',
  rootDirectory: __dirname,
  rootUrl: '/',
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
