var express = require('express');
var router = express.Router();
var Book = require('../models/book');

router.get('/:keyword', function(req, res) {
    var regex = req.params.keyword
    console.log(regex);
    Book.find({ title: {
        $regex: req.params.keyword,
        $options: 'i' }
    }, function(err, books) {
        if (err) throw err;
        return res.json(books);
    });
});

module.exports = router;