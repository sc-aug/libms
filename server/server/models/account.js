var mongooseUniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
    uname: {type: String, required: true, unique: true },
    passwd: {type: String, required: true },
    email: {type: String, required: true, unique: true },
    auth: { type: String, required: true},
    books: [{type: Schema.Types.ObjectId, ref: 'Book'}]
}, { collection: 'accounts'});

AccountSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Account', AccountSchema);
