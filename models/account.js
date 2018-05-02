const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

/*An Account is a Mongoose Schema with the following fields:
    1. username: String representing the username of the account.
    2. password: String representing the password of the account.
    3. first: String representing the first name associated with the account.
    4. last: String representing the last name associated with the account.
    5. address: String representing the address of the account holder.
    6. admin: Boolean representing whether the account is an admin account,
        true if it is an admin account, and false otherwise.
    7. events: Array representing an array of the events associated with this
        account.
<<<<<<< HEAD
=======

>>>>>>> 7bfa33fb1fcff7eb827d0f7983fcca3d07fac468
The Account Schema has the following methods:
    1. login: String String Callback -> Account
    2. addEvent: Event ->
*/

const accountSchema = new Schema({
        username: String,
        password: String,
        first: String,
        last: String,
        address: String,
        admin: Boolean,
        events: Array
    }
);

accountSchema.plugin(passportLocalMongoose);

accountSchema.methods.login = function(username, password, callback) {
    const acct = Account.findOne({ username: username }, callback);
    if (acct) {
        if (acct.password === password)
            return acct;
        else
            return "Invalid-password";
    }
    else
        return "No-account";
};


accountSchema.methods.addEvent = function (event) {
    if (!this.events.includes(event))
        this.events.push(event);
};

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;