const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {

    console.log(req.session);
    if (req.user) {
        res.render('index', { title: 'Event Tracker System', account: '/account/profile', account_link: 'Profile' });
    }
    else
        res.render('index', { title: 'Event Tracker System', account: '/account/login', account_link: 'Login' });

});

module.exports = router;