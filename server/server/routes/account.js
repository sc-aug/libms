var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var Account = require('../models/account');

const secret = 'my-secret-key';

/******************************
 * API for account operation
 *   - get account by id
 *   - delete account by id
 *   - get collection of accounts by auth
 *
 ******************************/

/**
 * check token validation
 * protect apis
 */
router.use('/', function(req, res, next) { // this will be reach at each requst
    // console.log("checking ... 'api/account/'");
    // console.log("server get token", req.query.token);
    jwt.verify(req.query.token, secret, function(err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next(); // make sure request reaches code blow
    })
});

/** ??
 * get account by id
 * token required
 */
// router.get('/id/:id', function(req, res) {
//     Account.findOne({ _id: req.params.id }, function(err, acc) {
//         if (err) {
//             console.error('error: ', err);
//             return res.status(500).json({
//                 title: 'An error occured [get account by id]',
//                 error: err
//             });
//         }
//         if (! acc) {
//             return res.status(500).json({
//                 title: 'No account found [get account by id]',
//                 error: { message: 'Account could not be found [get account by id]'}
//             });
//         }
//         return res.status(200).json(acc);
//     });
// })

/**
 * profile - update
 * only available to the person and admin
 * token required
 */
router.post('/:_id', function(req, res) {
    // check authentication
    const decoded = jwt.decode(req.query.token);
    const auth = decoded.acc.auth;
    if (auth != null && !(auth == 'admin' || auth == 'lib')) {
        if (auth != 'member' || decoded.acc._id != req.params._id) {
            console.error('error: not admin or librarian.');
            // not allowed
            return res.status(405).json({
                title: 'Profile update failed',
                error: { message: 'You are not allowed to update this profile.'}
            });
        }
    }

    Account.findOne({ _id: req.params._id }, function(err, acc) {
        if (err) {
            console.error('error: ', err);
            // status 500 server side error
            return res.status(500).json({
                title: 'Profile update failed [while fetching account]',
                error: err
            });
        }
        // check exististance of account
        if (! acc) {
            return res.status(500).json({
                title: 'Profile update failed',
                error: { message: 'Account could not be found [profile update]'}
            });
        }
        acc.email = req.body.email;
        acc.uname = req.body.uname;
        acc.auth = req.body.auth ? req.body.auth : acc.auth;

        acc.save(function(err, result) {
            if (err) {
                console.error('error: ', err);
                // status 500 server side error
                return res.status(500).json({
                    title: 'Profile update failed [while updating account data]',
                    error: err
                });
            }
            // 202: accepted
            res.status(202).json({
                message: 'Account Updated',
                obj: result
            });
        });
    });
});

/**
 * delete account
 * only available to the lib and admin
 * token required
 */
 router.delete('/:id', function(req, res) {
     // check authentication
     const decoded = jwt.decode(req.query.token);
     const auth = decoded.acc.auth;
     if (auth != null && !(auth == 'admin' || auth == 'lib')) {
         console.error('error: not admin or librarian.');
         // not allowed
         return res.status(405).json({
             title: 'Delete profile failed. not allowed.',
             error: { message: 'You are not allowed to delete this profile.'}
         });
     }
     console.log("delete account server get _id: ", req.params.id);
     Account.find({$and:[
         {'_id': req.params.id},
         {'books': [] },
     ]}, function(err, acc) {
         if (err) {
             console.error('error: ', err);
             // status 500 server side error
             return res.status(500).json({
                 title: 'An error occured [delete account]',
                 error: err
             });
         }
     }).remove().exec(function(err, result) {
         if (err) {
             console.error('error: ', err);
             // status 500 server side error
             return res.status(500).json({
                 title: 'An error occured [delete account] remove().exec()',
                 error: err
             });
         }
         if (result.result.n == 0) {
           return res.status(500).json({
               title: 'Make sure all books have been returned.',
               error: { message: 'books not returned. [delete account]'}
           });
         }
         return res.status(200).json({
             message: 'The account was deleted.'
         });
     });
 });

/**
 * all account
 * only available to admin & librarian
 * token required
 */
router.get('/auth/:auth', function(req, res) {
    const decoded = jwt.decode(req.query.token);
    const auth = decoded.acc.auth;
    if (auth && !auth == 'admin' && !auth == 'lib') {
        console.error('error: not admin or librarian.');
        // not allowed
        return res.status(405).json({
            title: 'Fetch profile failed. not allowed.',
            error: { message: 'You are not allowed to fetch profiles.'}
        });
    }
    Account.find({ auth: req.params.auth }, function(err, accs) {
        if (err) {
            console.error('error: ', err);
            // status 500 server side error
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        // check exististance of account
        // if (! accs) {
        //     return res.status(500).json({
        //         title: 'No account found',
        //         error: { message: 'No account found'}
        //     });
        // }
        res.status(200).json(accs);
    });
});

module.exports = router;
