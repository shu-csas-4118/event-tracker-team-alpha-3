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
*/

const accountSchema = new Schema({
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        first: {
            type: String,
            required: false
        },
        last: {
            type: String,
            required: false
        },
        address: {
            type: String,
            required: false
        },
        admin: {
            type: Boolean,
            required: true
        },
        events: {
            type: Array,
            required: true
        }
    }
);

accountSchema.plugin(passportLocalMongoose);

//login: String String -> Account or String
//Purpose: Logs the account into the server if the password given mathes the
//         password on the database, and returns an invalid-password message if not.
accountSchema.methods.login = function(username, password) {
    if (this.password === password)
        return this;
    else {
        return "Invalid-password";
    }
};

//addEvent: event -> void
//Purpose: Adds the given event to the account's array of events if the event is
//         not already in that array.
accountSchema.methods.addEvent = function (event) {
    if (!this.events.includes(event))
        this.events.push(event);
};

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;