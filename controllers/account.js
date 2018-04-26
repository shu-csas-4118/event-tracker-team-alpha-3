const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Account = require('../models/account');

router.get('/login', function (req, res) {
    res.render('login', { title: 'Login to Event Tracker System' });
});

router.post('/login', function (req, res, next) {
    const db = mongoose.connect('mongodb://localhost/eventtrack');
    const account = db.login(req.get("username"), req.get("password"));
});

router.get('/register', function (req, res) {
    res.render('register', { title: 'Register to Event Tracker System' });
});

router.post('/register', function (req, res, next) {
    const db = mongoose.connect('mongodb://localhost/eventtrack');

    var account = new Account({
        username: req.get("username"),
        password: req.get("password")
    });

    account.save(function (error) {
        if (error)
            console.log('error: ' + error.message);
        done();
    });

    mongoose.connection.close();
});

module.exports = router;
