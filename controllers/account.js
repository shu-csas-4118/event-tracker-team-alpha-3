const express = require('express');
const router = express.Router();
const passport = require('passport');
const Account = require('../models/account');
const Event = require('../models/event');

/*
  Login get for account:
    If there is no user in the session, renders the login page.
    If there is a user in the session, we shouldn't allow the user to
    log another user in, so head straight to the profile page.
*/
router.get('/login', function (req, res) {
  if (!req.user)
    res.render('login', { title: 'Alpha Labs: Login', links: ['/', '/events'],
    link_names: ['Home', 'Events']});
  else
    res.redirect('/account/profile');
});

/*
  Login post for account:
    Uses passport to authenticate the user into the session.  If there is
    an error, return the error.  If the passport authenticate method has
    some error info, re-renders the login page with the error info. Otherwise
    it will log the user into the session and redirect to the homepage.
*/
router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (error, account, info) {
    if (error)
      return next(error);
    if (info)
      return res.render('login', { error: info.message,
      links: ['/', '/events'], link_names: ['Home', 'Events'] });
    else {
      req.login(account, function (error) {
          if (error)
              return next(error);
          else
              return res.redirect('/account/profile');
      });
    }
  })(req, res, next);
});

/*
  Register get for account:
    Render the register page.  If there is a user, it will redirect the
    user to their profile page.
*/
router.get('/register', function (req, res) {
  if (req.user)
    res.redirect('/account/profile');
  else
    res.render('register', { title: 'Alpha Labs: Register',
    links: ['/', '/events'], link_names: ['Home', 'Events'] });
});

/*
  Register post for account:
    Registers the input user into the mongoose database.  If there was an
    error registering, meaning that user already exists, then it will
    re-render the register page with the appropriate error.  Otherwise it will
    authenticate the new account and redirect to the homepage.
*/
router.post('/register', function (req, res, next) {

  if (req.body.user_password !== req.body.user_repassword)
    res.render('register', {error: 'The passwords do not match.'});
  else {
    Account.register(new Account({
        username: req.body.user_mail,
        first: req.body.user_firstname,
        last: req.body.user_lastname,
        admin: false,
        address: req.body.user_address,
        events: []
    }), req.body.user_password, function (error, account) {
        if (error) {
            return res.render('register',
            { error: "Oops! That username already exists.  Try again.",
             links: ['/', '/account/login', '/events'],
             link_names: ['Home', 'Login', 'Events']});
        }
        passport.authenticate('local', res.redirect('/'));
    });
  }
});

/*
  Profile get for account:
    Renders the users profile page.  If there is no user logged into the
    session, it will redirect the user to the login page.  Otherwise it will
    render the profile page with the user's data.
*/
router.get('/profile', function (req, res, next) {
  if (!req.user)
    res.redirect('/account/login');
  else {
    const events = req.user.events;
    console.log(events);
    var event_names = [];
    for (let i = 0; i < events.length; i++) {
      Event.findOne({_id: events[i]}, function(error, event) {
        event_names.push(event.name);
      })
    }
    res.render('profile', { title: 'profile', account: req.user,
      names: event_names, links: ['/', '/events'], link_names: ['Home', 'Events']});
  }
});

/*
  Logout post for account:
    Logs the user out of the session, then redirects the user to the home page.
*/
router.post('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
