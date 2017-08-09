var express = require('express');
var router = express.Router();
var Book = require('../models/account');

router.get('/', function(req, res) {
    Book.find({}, function(err, accounts) {
        if (err) throw err;
        return res.json(accounts);
    });
});

module.exports = router;