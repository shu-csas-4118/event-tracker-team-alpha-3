const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var accountSchema = new Schema({
        username: String,
        password: String,
        first: String,
        last: String,
        address: String,
        admin: Boolean,
        events: Array
    }
);

accountSchema.methods.login = function(username, password, callback) {
    return this.model('users').findOne({ username: this.type },callback);
};

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;