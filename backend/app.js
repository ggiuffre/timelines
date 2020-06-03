const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// declare the main API route:
const timelineRouter = require('./routes/timeline');

// declare the app object:
const app = express();

// allow CORS: (TODO fine-tune for production)
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// mount middleware and other components:
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/timeline', timelineRouter);

// catch 404s and forward to an error handler:
app.use(function(req, res, next) {
  next(createError(404));
});

// handle errors:
app.use(function(err, req, res, next) {

  // set locals, only providing error in development:
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page:
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
