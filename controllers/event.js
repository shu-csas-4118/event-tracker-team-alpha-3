const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Event = require('../models/event');
const Account = require('../models/account');
const ObjectId = mongoose.Types.ObjectId;
/*
  Event get for events:
    Get method for an event.  Takes as input a parameter for the event id, and
    redirects to the event page for that event.  In order to display the page
    properly, it determines if there is a user logged in to display the correct
    account link, and also queries the database to find the exact event model
    to print the correct information.
*/
router.get('/:e', function (req, res) {
  const event_id = req.params.e;
  var acct;
  var acct_link;
  if (req.user) {
    acct = '/account/profile';
    acct_link = 'Profile'
  } else {
    acct = '/account/login';
    acct_link = 'Login';
  }
  Event.findOne({_id: event_id}, function(error, event) {
    res.render('event', { title: 'Alpha Labs: ' + event.name, e: event,
    links: ['/', acct, '/events'], link_names: ['Home', acct_link, 'Events'], user: req.user});
  })
});

/*
  Event register for events.
    Router method for registering to an event.  Takes as input a paramter for
    which event the user is registering to, then queries the database to find that
    event, and calls the event.registerUser method to add the user.  If there are
    error in registering, re-renders the registration page with the proper error.
*/
router.post('/:e/register', function(req, res, next) {
    var acct;
    var acct_link;
    if (req.user) {
        acct = '/account/profile';
        acct_link = 'Profile'
    } else {
        acct = '/account/login';
        acct_link = 'Login';
    }
  Account.findOne({_id: req.user._id}, function (error, account) {
      if (error)
          next(error);
      else {
          Event.findOne({_id: req.params.e}, function(error, event) {
              if (event.currentRegs >= event.maxRegistrants)
                  res.render('event', {title: 'Alpha Labs' + event.name,
                      links: ['/', acct, '/events'], link_names: ['Home', acct_link, 'Events'],
                      info: 'This event is full.  Please contact the event supervisor.'});
              else if (event.registrants.includes('"' + String(account._id)) + '"')
                  res.render('event', {title: 'Alpha Labs' + event.name, e: event,
                      links: ['/', acct, '/events'], link_names: ['Home', acct_link, 'Events'],
                      info: 'You are already registered for this event.'});
              else {
                  event.registrants.push(account._id);
                  event.currentRegs++;
                  event.save();
                  account.events.push(event._id);
                  account.save();
                  res.redirect('/');
              }
          });
      }
  })
});

module.exports = router;
