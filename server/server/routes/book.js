var express = require('express');
var router = express.Router();
var Book = require('../models/book');

/** API
 * get book by id
 * auth: all
 */
router.get('/:id', function(req, res) {
    Book.findOne({ _id: req.params.id }, function(err, book) {
        if (err) {
            console.error('error: ', err);
            // status 500 server side error
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        // check exististance of account
        if (! book) {
            return res.status(500).json({
                title: 'No book found',
                error: { message: 'No book found'}
            });
        }
        console.log(book);
        res.status(200).json(book);
    });
});

/** API
 * add a book
 * auth: lib & admin
 */
router.post('/', function(req, res) {
    // console.log(req.body);
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

/** API
 * delete
 * auth: lib & admin
 */
router.delete('/:id', function(req, res) {
    console.log("server get bookID: ", req.params.id);
    Book.find({ _id: req.params.id } , function(err, book) {
        if (err) {
            console.error('error: ', err);
            // status 500 server side error
            return res.status(500).json({
                title: 'An error occured [fetch book] [delete]',
                error: err
            });
        }
        // check exististance of account
        if (! book) {
            return res.status(500).json({
                title: 'No book found [delete]',
                error: { message: 'No book found'}
            });
        }
        console.log("book fetched before delete! ", book);

        
    }).remove().exec(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred [delete]',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Book deleted',
                obj: result
            });
        });
});

/**
 * edit book api
 * auth: lib & admin
 */
router.patch('/:id', function(req, res) {
    console.log("get data during updating: ", req.body);

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
    Book.find({}, function(err, books) {
        if (err) throw err;
        return res.json(books);
    });
});

module.exports = router;