var express = require('express');
var createError = require('http-errors');

// Session related
var session = require('express-session');
var cookieParser = require('cookie-parser');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');

// Logger
var logger = require('morgan');

// Multer Middleware and DB
var multer = require('multer');
var mongoose = require('mongoose');

// Image related
var fs = require('fs');
var path = require('path');

// Dotenv config
require('dotenv').config();


var app = express();
app.use(bodyParser.json());

// Use helmet for incresead security 
var helmet = require('helmet');
app.use(helmet());


// CORS
var cors = require('cors');
app.use(cors());


// Swagger
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Icons and bootstrap
app.use('/favicon.ico', express.static('public/images/favicon.ico'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// MongoDB Config
var mongoDBURL = process.env.MONGOURL;


// Detect if dotenv exists
if (!mongoDBURL) {
  console.log('Please set a dotenv config file first...\nExample used:\n');
  console.log('MONGOURL=\'mongodb://<user>:<password>@<host>:<port>/<database>\'');
  console.log('ENCRYPTION=\'sha512\'');
  console.log('SECRET_KEY=\'rg\'');
  console.log('\n!> Check the report of milestone1 for the credentials of mongodb');
  
  process.exit();
} else {
  mongoose.connect(mongoDBURL, {useNewUrlParser: true, useUnifiedTopology: true});
}

var dbconn = mongoose.connection;

dbconn.on('error', console.error.bind(console, '[[[ ERROR ]]] MongoDB connection error:'));
dbconn.on('connected', console.log.bind(console, '[OK] MongoDB connection sucess'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// use the logger
app.use(logger('dev'));

// Get JSON DATA
app.use(express.json());
// Get FORM DATA
app.use(express.urlencoded({ extended: true }));

// Session related
app.use(session({
  // use a random string as the session id
  name: crypto.randomBytes(20).toString('hex'),
  secret: crypto.randomBytes(64).toString('hex'),
  resave: true,
  saveUninitialized: true
}));
app.use(cookieParser());


// Anti Brute Force Config
const { RateLimiterMemory } = require('rate-limiter-flexible');

const opts = {
  points: 10, // 10 requests per second per IP and IP will be blocked for 5 minutes
  duration: 1, // Per second
  blockDuration: 300, // block for 5 minutes if more than points consumed 
};

const rateLimiter = new RateLimiterMemory(opts);

const rateLimiterMiddleware = (req, res, next) => {
  // Consume 1 point for each request
  rateLimiter.consume(req.connection.remoteAddress)
    .then(() => {
      next();
    })
    .catch((rejRes) => {
      // Fake a 404 error
      res.status(404).render('error/404');
    });
};

app.use(rateLimiterMiddleware);


// Use the public folder to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Use the public/images/books folder to serve static files of books
app.use('/images/books', express.static(path.join(__dirname, 'public/images/books')));

// ----------------------- Routes -----------------------
var indexRouter = require('./routes/index');
var authBackofficeRouter = require('./routes/authBackoffice');
var backofficeAdminRouter = require('./routes/backofficeAdmin');
var backofficeEmployeeRouter = require('./routes/backofficeEmployee');
var clientAPIRouter = require('./routes/clientapi');

app.use('/', indexRouter);
app.use('/backoffice', authBackofficeRouter);
app.use('/backoffice/admin', backofficeAdminRouter);
app.use('/backoffice/employee', backofficeEmployeeRouter);
app.use('/clientapi', clientAPIRouter);
// -----------------------------------------------------


// catch 404 and 500 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(req, res, next) {
  next(createError(500));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page if 404 or 500
  if (err.status === 404) {
    res.status(404).render('error/404');
  }
  else if (err.status === 500) {
    res.status(500).render('error/error');
  } else {
    res.status(err.status || 500);
    res.render('error/error');
  }
});

module.exports = app;
