var express = require('express');
var router = express.Router();
var Book = require('../models/book');

router.get('/:keywords', function(req, res) {
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
