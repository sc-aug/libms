var express = require('express');
var router = express.Router();
var Book = require('../models/book');

router.get('/:keywords', function(req, res) {
    var regex = req.params.keywords
    console.log(regex);
    Book.find({ title: {
        $regex: req.params.keywords,
        $options: 'i' }
    }, function(err, books) {
        if (err) {
            console.error('error: ', err);
            // status 500 server side error
            return res.status(500).json({
                title: 'An error occured [search book]',
                error: err
            });
        }
        res.status(200).json(books);
    });
});

module.exports = router;