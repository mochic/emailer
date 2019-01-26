const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const app = express();

// middleware?
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());

// logging config
app.use(
  logger('dev', {
    skip: (req, res) => res.statusCode < 400,
    stream: process.stderr,
  })
);

app.use(
  logger('dev', {
    skip: (req, res) => res.statusCode >= 400,
    stream: process.stdout,
  })
);

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
