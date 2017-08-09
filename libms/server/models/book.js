var mongooseUniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    title: {type: String, required: true, unique: true },
    author: {type: String, required: true },
    publisher: {type: String, required: true },
    language: {type: String, required: true },
    subject: {type: [String], required: true },
    discription: {type: String, required: true },
}, { collection: 'books'});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Book', schema);
