var express = require('express');
var router = express.Router();
var Book = require('../models/book');

// get all books - testing
router.get('/', function(req, res) {
    Book.find({}, function(err, books) {
        if (err) throw err;
        return res.json(books);
    });
});

router.post('/', function(req, res) {
    var bk = new Book({
        copy: 10,
        remain: 10,
        title: 'TMP',
        author: 'TMP',
        publisher: 'pubTMP',
        year: 2017,
        subjects: ['TMP', 'asdf'],
        discription: 'TMPdiscpt',
    });
    book.save(function(err, result) {
        if (err) throw err;
        console.log("result: " + result);
    });
    // _id: { type: Schema.Types.ObjectId, required: true },
    // remain: { type: Number, required: true},
    // copy: { type: Number, required: true},
    // title: { type: String, required: true, unique: true },
    // author: { type: String, required: true },
    // publisher: { type: String, required: true },
    // year: { type: Number, required: true },
    // language: { type: String, required: true },
    // subjects: {type: [String], required: true },
    // discription: { type: String, required: true }

});


module.exports = router;