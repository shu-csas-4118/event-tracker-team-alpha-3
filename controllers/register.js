var express = require('express');
var router = express.Router();
'usestrict';
const expect = require('chai').expect;
var mongoose = require('mongoose');
const User = (".../models/user");


router.get('/', function(req, res) 
{
    res.render('register', { title: 'Regester to ETS' });
});
router.post('/', function(req, res, next)
{
 
        const db = mongoose.connect('mongodb://localhost/TestingSoftwareDataBase');

        var account = new User({
            email: req.get("user_mail"),
            password: req.get("user_password"),
            firstName: req.get("user_firstname"),
            lastName: req.get("user_lastname"),
            address: req.get("user_address"),
            admin: false, 
            events: []
        });


        account.save((error)=> {
            if(error) console.log('error' + error.message);
            done();
        }); 
        
        mongoose.connection.close();
});

module.exports = router;