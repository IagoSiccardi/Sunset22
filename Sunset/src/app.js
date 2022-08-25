var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override')
const session = require ('express-session');
const localsCheck = require('./middlewares/localsCheck')
const cookiesCheck = require('./middlewares/cookiesCheck')

var mainRouter = require('./routes/main');
var usersRouter = require('./routes/users');
const productRouter = require('./routes/products')
const errorRouter = require('./routes/error404')
const cartApiRouter = require('./routes/cartApi')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(methodOverride('_method'))
app.use(session({
  secret : "sunset123",
  resave : false,
  saveUninitialized: false
}));
app.use(localsCheck)
app.use(cookiesCheck)

app.use('/', mainRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter)
app.use('*', errorRouter)
app.use('/cartApi', cartApiRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
