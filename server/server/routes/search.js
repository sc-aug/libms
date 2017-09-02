var express = require('express');
var router = express.Router();
var Book = require('../models/book');

/** API
 * get book by id
 * auth: all
 */
router.get('/id/:id', function(req, res) {
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
        //console.log(book);
        res.status(200).json(book);
    });
});

router.get('/kw/:keywords', function(req, res) {
    var kw = req.params.keywords
    console.log("search book. keywords:", kw);
    Book.find({ title: {
        $regex: kw,
        $options: 'i' }
    }, function(err, b1) {
        if (err) {
            console.error('error: ', err);
            // status 500 server side error
            return res.status(500).json({
                title: 'An error occured [search book]',
                error: err
            });
        }

        Book.find({ author: {
            $regex: kw,
            $options: 'i' }
        }, function(err, b2) {
            if (err) {
                console.error('error: ', err);
                // status 500 server side error
                return res.status(500).json({
                    title: 'An error occured [search book]',
                    error: err
                });
            }
            // might have duplicate result
            res.status(200).json(b1.concat(b2));
        });
    });
});

module.exports = router;
