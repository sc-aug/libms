var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var Account = require('../models/account');
var Book = require('../models/book');

const secret = 'my-secret-key';

/******************************
 * API for book transactions
 *   - list borrowed book by account id
 *   - borrow book by account id and book id
 *   - return book by account id and book id
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
                 error: { message: 'Access Token Required' }
             });
         }
         next(); // make sure request reaches code blow
     })
 });

/** API
 * borrow list
 * auth: lib & admin
 */
router.get('/list/:_id', function(req, res) {
    // check authentication
    const decoded = jwt.decode(req.query.token);
    const auth = decoded.acc? decoded.acc.auth : null;
    if (auth != null && !(auth == 'admin' || auth == 'lib')) {
        if (auth != 'member' || decoded.acc._id != req.params._id) {
            console.error('error: not admin or librarian.');
            // not allowed
            return res.status(405).json({
                title: 'Not authorized.',
                error: { message: 'Not Admin or Lib or you are accessing other people\'s profile.'}
            });
        }
    }
    var m_id = req.params._id;
    console.log("search borrow list: ", m_id);
    Account.findById(m_id)
    .populate('books', {
        'title': 'title',
        'author': 'author'
    })
    .exec(function(err, member) {
        if (err) {
            console.error('error: ', err);
            // status 500 server side error
            return res.status(500).json({
                title: 'An error occured [search borrow list]',
                error: err
            });
        }
        return res.status(200).json({
            message: 'search borrow list. success.',
            obj: member.books
        });
    });
});

/** API
 * borrow
 * auth: lib & admin
 */
router.post('/borrow', function(req, res) {
    var b_id = req.body.b_id;
    var m_id = req.body.m_id;
    // check authentication
    const decoded = jwt.decode(req.query.token);
    const auth = decoded.acc? decoded.acc.auth : null;
    if (auth != null && !(auth == 'admin' || auth == 'lib')) {
        console.error('error: not admin or librarian.');
        // not allowed
        return res.status(405).json({
            title: 'borrow book. not allowed.',
            error: { message: 'Not Admin or Librarian' }
        });
    }

    Account.findById(m_id, function(err, acc) {
        if (err) {
            console.error('error: ', err);
            // status 500 server side error
            return res.status(500).json({
                title: 'An error occured [borrow [find acc by id]]',
                error: err
            });
        }
        Book.findById(b_id, function(err, book) {
            if (err) {
                console.error('error: ', err);
                // status 500 server side error
                return res.status(500).json({
                    title: 'An error occured [borrow [find book by id]]',
                    error: err
                });
            }
            if (! book) {
                return res.status(500).json({
                    title: 'No book found [borrow [find book by id]]',
                    error: err
                });
            }
            if (book.remain <= 0) {
                return res.status(500).json({
                    title: 'Invalid Operation.',
                    error: { message: 'No more copy of this book available for borrow. [borrow book]'}
                });
            }
            acc.books.push(book);
            book.borrower.push(acc);
            book.remain = book.remain - 1;
            acc.save();
            book.save();
        });
    });

});

/** API
 * return
 * auth: lib & admin
 */
router.post('/return', function(req, res) {
    var b_id = req.body.b_id;
    var m_id = req.body.m_id;
    // check authentication
    const decoded = jwt.decode(req.query.token);
    const auth = decoded.acc? decoded.acc.auth : null;
    if (auth != null && !(auth == 'admin' || auth == 'lib')) {
        console.error('error: not admin or librarian.');
        // not allowed
        return res.status(405).json({
            title: 'Not authorized.',
            error: { message: "Only Admin and Librarian can do this operation.[return book]" }
        });
    }
    Account.findById(m_id, function(err, acc) {
        if (err) {
            console.error('error: ', err);
            // status 500 server side error
            return res.status(500).json({
                title: 'An error occured [borrow [find acc by id]]',
                error: err
            });
        }
        Book.findById(b_id, function(err, book) {
            if (err) {
                console.error('error: ', err);
                // status 500 server side error
                return res.status(500).json({
                    title: 'An error occured [borrow [find book by id]]',
                    error: err
                });
            }
            if (! book) {
                return res.status(500).json({
                    title: 'No book found [return [find book by id]]',
                    error: err
                });
            }
            if (acc.books.indexOf(book._id) == -1) {
                return res.status(500).json({
                    title: "Invalid Operation.",
                    error: { message: "Member didn't borrow this book [return book]"}
                });
            }
            console.log("before", acc, book);

            acc.books.splice(acc.books.indexOf(m_id), 1);
            book.borrower.splice(book.borrower.indexOf(b_id), 1);
            // acc.books.pull(book);
            // book.borrower.pull(acc);
            book.remain = book.remain + 1;
            acc.save();
            book.save();

            console.log("after", acc, book);
        });
    });

});


module.exports = router;
