const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Event = require('../models/event');

router.get('/event', function (req, res) {
    res.render('event', { title: 'Event page' });
});

router.get('/event', function (req, res){

});

module.exports = router;