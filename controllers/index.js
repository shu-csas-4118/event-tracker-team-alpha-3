const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {

    if (!req.session.acct)
        req.session.acct = null;
    console.log(req.session);
    if (req.session && req.session.acct) {
        res.render('index', { title: 'Event Tracker System', account: '/account/profile', account_link: 'Profile' });
    }
    else
        res.render('index', { title: 'Event Tracker System', account: '/account/login', account_link: 'Login' });

});

module.exports = router;