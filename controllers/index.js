const express = require('express');
const router = express.Router();

/*
  Index get for homepage:
    If there is a user signed into the session, it will render the index
    page with the link being the profile link in the navbar.  Otherwise it
    will render the index page with the login link in the navbar.
*/
router.get('/', function(req, res, next) {
    console.log(req.user);
    if (req.user)
        res.render('index', { title: 'Alpha Labs',
        links:['/account/profile', '/events'], link_names: ['Profile', 'Events'] });
    else
        res.render('index', { title: 'Alpha Labs',
        links:['/account/login', '/events'], link_names: ['Login', 'Events'] });

});

module.exports = router;
