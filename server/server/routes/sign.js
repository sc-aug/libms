var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var Account = require('../models/account');

const secret = 'my-secret-key';

/**
 * signup api
 * no protect required
 */
router.post('/up', function(req, res) {
    console.log("receive signup req. creating:", req.body.uname);
    //console.log(req.body);
    var acc = new Account({
        uname: req.body.uname,
        passwd: bcrypt.hashSync(req.body.passwd, 10),
        email: req.body.email,
        auth: req.body.auth
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

/**
 * signin api
 * no protect required
 */
router.post('/in', function(req, res) {
    console.log("receive signin req. who:", req.body.email);
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
                title: 'Login failed',
                error: { message: 'Account could not be found'}
            });
        }
        if (! bcrypt.compareSync(req.body.passwd, acc.passwd)) {
            // authorization failed
            return res.status(401).json({
                title: 'Login failed',
                error: { message: 'Invalid login credentials'}
            });
        }
        // generate token
        //                     payload     sec-key  token-config
        var token = jwt.sign({ acc: acc }, secret, { expiresIn: 7200 });
        res.status(200).json({
            message: 'Successfully logged in',
            account: {
              token: token,
              _id: acc._id,
              uname: acc.uname,
              auth: acc.auth,
              email: acc.email
            }
        });
    })
});

module.exports = router;
