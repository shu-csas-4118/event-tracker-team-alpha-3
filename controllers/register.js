var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('register', { title: 'Regester to ETS' });
});

module.exports = router;