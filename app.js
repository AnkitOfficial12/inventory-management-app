var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();
const routes = require('./src/routes/index');
const errorHandler = require('./src/middleware/error.middleware');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Register routes
app.use('/api/v1', routes);
// app.use('/users', usersRouter);

// Global error handler 
app.use(errorHandler);

module.exports = app;
