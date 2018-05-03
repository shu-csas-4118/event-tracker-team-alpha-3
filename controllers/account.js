const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Account = require('../models/account');

router.get('/login', function (req, res) {
    res.render('login', { title: 'Login to Event Tracker System' });
});

router.post('/login', function (req, res, next) {
    console.log('Login form submitted');
    const user_mail = req.body.username;
    Account.findOne({ username: user_mail}, function (error, account) {
        if (error)
            console.log('error: ' + error.message);
        if (account) {
            const acct = account.login(user_mail, req.body.password, next);
            if (acct === "Invalid-password") {
                res.render('login', { error: 'Invalid username or password' })
            }
            else
                res.redirect('/');
        }
        else {
            res.render('login', { error: 'No account with that username.' })
        }
    });

});

router.get('/register', function (req, res) {
    res.render('register', { title: 'Register to Event Tracker System' });
});

router.post('/register', function (req, res, next) {

    const account = new Account({
        username: req.body.user_mail,
        password: req.body.user_password,
        first: req.body.user_firstname,
        last: req.body.user_lastname,
        admin: false,
        address: req.body.user_address
    });

    account.save(function (error) {
        if (error)
            console.log('error: ' + error.message);
        else
            console.log("Account saved successfully.");
    });

    res.redirect('/');
});

module.exports = router;
