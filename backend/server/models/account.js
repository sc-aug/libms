var mongooseUniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    uname: {type: String, required: true, unique: true },
    passwd: {type: String, required: true },
    email: {type: String, required: true }
}, { collection: 'accounts'});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Account', schema);
