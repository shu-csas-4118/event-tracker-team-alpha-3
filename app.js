//A list of the required libraries:
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

//Account is required here to make use of passport authentication.
const Account = require('./models/account');

//Server controllers
const index = require('./controllers/index');
const account = require('./controllers/account');
const event = require('./controllers/event');

//Server application is started here
const app = express();

//View Engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true},
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/account', account);
app.use('/event', event);

passport.use('local', new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//Here is the connection to the MongoDB.
mongoose.connect('mongodb://localhost:27017/eventtrack');

//Catch 404 and forward to error handler
app.use(function(req, res, next) 
{
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//Error handler
app.use(function(err, req, res, next) 
{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Here the server listens on the port 8081 for user requests.
const server = app.listen(8081, function () {
    console.log('Listening on port 8081');
});

server.setTimeout(0, function() {
  console.log('Server timed out');
});

module.exports = app;
