var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mainRouter = require('./routes/main');
var usersRouter = require('./routes/users');
const productRouter = require('./routes/products')
const errorRouter = require('./routes/error404')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/', mainRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter)
app.use('*', errorRouter)

/* app.get('/',(req,res) => res.sendFile(path.join(__dirname,'views','index.html')))

app.get('/login',(req,res) => res.sendFile(path.join(__dirname,'views','login.html')))

app.get('/product-cart',(req,res) => res.sendFile(path.join(__dirname,'views','productCart.html')))

app.get('/product-detail',(req,res) => res.sendFile(path.join(__dirname,'views','productDetail.html')))

app.get('/register',(req,res) => res.sendFile(path.join(__dirname,'views','register.html')))

app.get('/productos',(req,res) => res.sendFile(path.join(__dirname,'views','productos.html')))

app.get('/nosotros',(req,res) => res.sendFile(path.join(__dirname,'views','nosotros.html')))

app.get('*',(req,res) => res.sendFile(path.join(__dirname,'views','error404.html'))) */


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
