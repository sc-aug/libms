var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var Book = require('../models/book');

const secret = 'my-secret-key';

/******************************
 * API for book operation
 *   - add book
 *   - update book
 *   - delete book
 *   - // fetch all books
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

/** API
 * add a book
 * auth: lib & admin
 */
router.post('/', function(req, res) {
    const decoded = jwt.decode(req.query.token);
    const auth = decoded.acc.auth;
    if (auth != null && !(auth == 'admin' || auth == 'lib')) {
        console.error('error: not admin or librarian.');
        // not allowed
        return res.status(405).json({
            title: 'Not authorized.',
            error: { message: 'Only Admin and Librarian are allowed to do this operation. [add book]'}
        });
    }

    var book = new Book({
        remain: req.body.remain,
        copy: req.body.copy,
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        year: req.body.year,
        lang: req.body.lang,
        subjects: req.body.subjects,
        description: req.body.description
    });

    // console.log(book);
    book.save(function(err, result) {
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
            message: 'New Book Created',
            obj: result
        });
    });
});

/**
 * delete book
 * only available to the lib and admin
 * token required
 */
router.delete('/:id', function(req, res) {
    console.log("delete book server get _id: ", req.params.id);
    const decoded = jwt.decode(req.query.token);
    const auth = decoded.acc.auth;
    if (auth != null && !(auth == 'admin' || auth == 'lib')) {
        console.error('error: not admin or librarian.');
        // not allowed
        return res.status(405).json({
            title: 'Not authorized.',
            error: { message: 'Only Admin and Librarian are allowed to do this operation.[delete book]'}
        });
    }
    Book.find({$and:[
        {'_id': req.params.id},
        {'borrower': [] },
    ]}, function(err, acc) {
        if (err) {
            console.error('error: ', err);
            // status 500 server side error
            return res.status(500).json({
                title: 'An error occured [delete book]',
                error: err
            });
        }
    }).remove().exec(function(err, result) {
        if (err) {
            console.error('error: ', err);
            // status 500 server side error
            return res.status(500).json({
                title: 'An error occured [delete book] remove().exec()',
                error: err
            });
        }
        if (result.result.n == 0) {
          return res.status(500).json({
              title: 'Make sure all copies have been returned.',
              error: { message: 'copies of book not returned. [delete book]'}
          });
        }
        return res.status(200).json({
            message: 'The book was deleted.'
        });
    });
});


/**
 * edit book api
 * auth: lib & admin
 */
router.patch('/:id', function(req, res) {
    //console.log("edit book. data: ", req.body);
    const decoded = jwt.decode(req.query.token);
    const auth = decoded.acc.auth;
    if (auth != null && !(auth == 'admin' || auth == 'lib')) {
        console.error('error: not admin or librarian.');
        // not allowed
        return res.status(405).json({
            title: 'Not authorized.',
            error: { message: 'Only Admin and Librarian are allowed to do this operation.[edit book]'}
        });
    }
    Book.findById(req.params.id, function(err, book) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred while findById',
                error: err
            });
        }
        if (!book) {
            return res.status(500).json({
                title: 'No Book Found!',
                error: { message: 'book not found'}
            });
        }

        book.remain = req.body.remain;
        book.copy = req.body.copy;
        book.title = req.body.title;
        book.author = req.body.author;
        book.publisher = req.body.publisher;
        book.year = req.body.year;
        book.lang = req.body.lang;
        book.subjects = req.body.subjects;
        book.description = req.body.description;

        book.save(function(err, result) {
            if (err) {
                console.error('error: ', err);
                // status 500 server side error
                return res.status(500).json({
                    title: 'An error occured while saving data',
                    error: err
                });
            }
            // 200: success
            res.status(200).json({
                message: 'Book updated',
                obj: result
            });
        });
    });
});

/**
 * get all books - testing
 */
router.get('/', function(req, res) {
    const decoded = jwt.decode(req.query.token);
    const auth = decoded.acc.auth;
    if (auth != null && !(auth == 'admin' || auth == 'lib')) {
        console.error('error: not admin or librarian.');
        // not allowed
        return res.status(405).json({
            title: 'Not authorized.',
            error: { message: 'Only Admin and Librarian are allowed to do this operation. [fetch all books]'}
        });
    }
    Book.find({}, function(err, books) {
        if (err) throw err;
        return res.json(books);
    });
});

module.exports = router;
