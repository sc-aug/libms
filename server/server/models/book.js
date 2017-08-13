var mongooseUniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
    remain: { type: Number, required: true},
    copy: { type: Number, required: true},
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    publisher: { type: String, required: true },
    year: { type: Number, required: true },
    lang: { type: String, required: true },
    subjects: {type: [String], required: true },
    description: { type: String, required: true },
    borrower: [{type: Schema.Types.ObjectId, ref: 'Account'}]
}, { collection: 'books'});

BookSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Book', BookSchema);
