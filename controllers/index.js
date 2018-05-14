const express = require('express');
const router = express.Router();

/*
  Index get for homepage:
    If there is a user signed into the session, it will render the index
    page with the link being the profile link in the navbar.  Otherwise it
    will render the index page with the login link in the navbar.
*/
router.get('/', function(req, res, next) {
    if (req.user)
        res.render('index', { title: 'Alpha Labs',
        account: '/account/profile', account_link: 'Profile' });
    else
        res.render('index', { title: 'Alpha Labs',
        account: '/account/login', account_link: 'Login' });

});

module.exports = router;
