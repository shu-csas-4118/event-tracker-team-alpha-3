const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Account = require('../models/account');

router.get('/login', function (req, res) {
    res.render('login', { title: 'Login to Event Tracker System' });
});

router.post('/login', function (req, res, next) {
    mongoose.connect('mongodb://localhost/eventtrack');
    console.log('Login form submitted');
    const user_mail = req.get("username");
    const account = Account.findOne({ username: user_mail}, function (error, account) {
        if (error)
            console.log('No user found');
        if (account)
            account.login(user_mail, req.get("password"), next);
        else
            console.log('No user found');
    });
});

router.get('/register', function (req, res) {
    res.render('register', { title: 'Register to Event Tracker System' });
});

router.post('/register', function (req, res, next) {
    mongoose.connect('mongodb://localhost/eventtrack');

    const db = mongoose.connection;

    const account = new Account({
        username: req.get("user_mail"),
        password: req.get("user_password"),
        first: req.get("user_firstname"),
        last: req.get("user_lastname"),
        address: req.get("user_address")
    });

    account.save(function (error) {
        if (error)
            console.log('error: ' + error.message);
        else
            console.log("Account saved successfully.");
    });

    mongoose.connection.close();
});

module.exports = router;
