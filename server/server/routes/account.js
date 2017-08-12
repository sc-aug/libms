var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var Account = require('../models/account');

// signup
router.post('/', function(req, res) {
    console.log(req.body);
    var acc = new Account({
        uname: req.body.uname,
        passwd: bcrypt.hashSync(req.body.passwd, 10),
        email: req.body.email,
        auth: "member"
    });
    acc.save(function(err, result) {
        if (err) {
            console.error('error: ', err);
            // status 500 server side error
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        // 200: success and created
        res.status(201).json({
            message: 'Account Created',
            obj: result
        });
    });
});

// signin
router.post('/signin', function(req, res, next) {
    // retriving user by email
    // compare hashed password
    Account.findOne({ email: req.body.email }, function(err, acc) {
        if (err) {
            console.error('error: ', err);
            // status 500 server side error
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        // check exististance of account
        if (! acc) {
            return res.status(500).json({
                title: 'No account found',
                error: { message: 'Account could not be found'}
            });
        }
        if (! bcrypt.compareSync(req.body.passwd, acc.passwd)) {
            // authorization failed
            return res.status(401).json({
                title: 'Wrong password',
                error: { message: 'Invalid login credentials'}
            });
        }
        // generate token
        var token = jwt.sign({ acc: acc }, 'my-secret-key', { expiresIn: 7200 });
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            accId: acc._id,
            accName: acc.uname,
            accAuth: acc.auth
        });
    })
});

// Only for oneself and admin
router.get('/:uname', function(req, res) {
     Account.findOne({ uname: req.params.uname }, function(err, acc) {
        if (err) {
            console.error('error: ', err);
        } else {
            res.json(acc);
        }
     });
});

// Only for admin
// get all account.
// not secure, for testing only
router.get('/', function(req, res) {
    Account.find({}, function(err, accounts) {
        if (err) throw err;
        return res.json(accounts);
    });
});

module.exports = router;
