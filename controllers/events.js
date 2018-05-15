const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Event = require('../models/event');

/*
  Home for events:
    This directs to the main page for the listing of the events.  It
    renders the events page.
*/
router.get('/', function (req, res, next) {
  var acct = '/account/';
  var acct_link;
  if (req.user) {
    acct = acct + 'profile';
    acct_link = 'Profile';
  } else {
    acct = acct + 'login';
    acct_link = 'Login';
  }
  Event.find({}, 'name startDate endDate', function (err, events) {
    if (err) {
      console.log(err);
    } else {
      let e_links = [], e_names = [], e_starts = [], e_ends = [];
      for (var i = 0; i < events.length; i++) {
        e_links.push(events[i]._id);
        e_names.push(events[i].name);
        e_starts.push(events[i].startDate);
        e_ends.push(events[i].endDate);
      }
      res.render('events', {
        title: 'Alpha Labs: Events', links: ['/', acct],
        link_names: ['Home', acct_link] , elinks: e_links,
        names: e_names, starts: e_starts, ends: e_ends
      });
    }
  })
});

router.post('/search', function (req, res, next) {
  var acct = '/account/';
  var acct_link;
  if (req.user) {
    acct = acct + 'profile';
    acct_link = 'Profile';
  } else {
    acct = acct + 'login';
    acct_link = 'Login';
  }

  Event.find({name: req.body.search}, 'name startDate endDate', function (err, events) {
    if (err) {
      console.log(err);
    } else {
      let e_links = [], e_names = [], e_starts = [], e_ends = [];
      for (var i = 0; i < events.length; i++) {
        e_links.push(events[i]._id);
        e_names.push(events[i].name);
        e_starts.push(events[i].startDate);
        e_ends.push(events[i].endDate);
      }
      console.log(e_links);
      console.log(e_names);
      res.render('events', {
        title: 'Alpha Labs: Events', links: ['/', acct], link_names: ['Home', acct_link],
        elinks: e_links, names: e_names, starts: e_starts, ends: e_ends
      });
    }
  })
});

router.get('/eventcreation', function (req, res, next) {
  var acct = '/account/';
  var acct_link;
  if (req.user) {
    acct = acct + 'profile';
    acct_link = 'Profile';
  } else {
    acct = acct + 'login';
    acct_link = 'Login';
  }
  res.render('eventcreation', {
    title: 'Alpha Labs: Event Creation',
    links: ['/', acct], link_names: ['Home', acct_link]
  });
});

/*
  Event render for events.
    This post method is used when a user clicks on one of the events on the
    events page.  It takes as input a paramter for which event the user clicked
    on, which is the id of the event.  It then redirects the user to the
    page for that event.
*/

router.post('/eventcreation', function (req, res, next) {
  Event.create(new Event
    ({
      name: req.body.event_name,
      email: req.body.event_email,
      supervisor: req.body.event_supervisor,
      address: req.body.event_address,
      startDate: req.body.event_start,
      endDate: req.body.event_end,
      comments: req.body.event_comments,
      registrants: [],
      maxRegistrants: req.body.event_max,
      currentRegs: 0,
    }));
  res.redirect('/events');
});




module.exports = router;
