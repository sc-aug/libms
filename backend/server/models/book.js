var mongooseUniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    remain: { type: Number, required: true},
    copy: { type: Number, required: true},
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    publisher: { type: String, required: true },
    year: { type: Number, required: true },
    language: { type: String, required: true },
    subjects: {type: [String], required: true },
    discription: { type: String, required: true }
}, { collection: 'books'});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Book', schema);
