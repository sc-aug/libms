var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var Account = require('../models/account');
var Book = require('../models/book');

/** API
 * borrow list
 * auth: lib & admin
 */
router.get('/list/:m_id', function(req, res) {
    var m_id = req.params.m_id;
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
            //console.log(member_book);
            res.status(200).json({
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
                    title: 'valid operation, 0 book left.'
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
                    title: "Invalid Operation. Member didn't borrow this book [return book]"
                });
            }
            acc.books.pull(book);
            book.borrower.pull(acc);
            book.remain = book.remain + 1;
            acc.save();
            book.save();
        });
    });

});


module.exports = router;
