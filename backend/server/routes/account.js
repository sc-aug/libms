var express = require('express');
var router = express.Router();
var Account = require('../models/account');
const FAIL = 'fail';
const SUCCESS = 'success';

router.get('/', function(req, res) {
    Account.find({}, function(err, accounts) {
        if (err) throw err;
        return res.json(accounts);
    });
});

router.post('/', function(req, res) {
    console.log(req.body);
    var acc = new Account({
        uname: req.body.uname,
        passwd: req.body.passwd,
        email: req.body.email
    });
    acc.save(function(err, result) {
        if (err) {
            console.error('error: ', err);
            res.send(FAIL);
        } else {
            res.send(SUCCESS);
        }
    });
});

router.get('/:uname', function(req, res) {
     Account.findOne({ uname: req.params.uname }, function(err, acc) {
        if (err) {
            console.error('error: ', err);
        } else {
            res.json(acc);
        }
     });
});

module.exports = router;
