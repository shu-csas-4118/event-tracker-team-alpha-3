const express = require('express');
const router = express.Router();
const passport = require('passport');
const Account = require('../models/account');
const bcrypt = require('bcrypt');

router.get('/login', function (req, res) {
    res.render('login', { title: 'Login to Event Tracker System' });
});

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (error, account, info) {
        if (error)
            return next(error);
        if (info)
            return res.render('login', { error: info.message });
        else {
            req.login(account, function (error) {
                if (error)
                    return next(error);
                else
                    return res.redirect('/');
            });
        }
    })(req, res, next);
});

router.get('/register', function (req, res) {
    res.render('register', { title: 'Register to Event Tracker System' });
});

//This is used when a registration form is posted to the server.  An account is registered
//to the database and the user is redirected to the home page.  If the given username is
//already in the database, redirects to the register page again with an error message.
router.post('/register', function (req, res, next) {

    Account.register(new Account({
        username: req.body.user_mail,
        //password: req.body.user_password,
        first: req.body.user_firstname,
        last: req.body.user_lastname,
        admin: false,
        address: req.body.user_address
    }), req.body.user_password, function (error, account) {
        if (error) {
            return res.render('register', { error: "Oops! That username already exists.  Try again." });
        }
        passport.authenticate('local', res.redirect('/'));
    });
});

router.get('/profile', function (req, res, next) {
    res.render('profile', { account: req.user });
});

module.exports = router;
