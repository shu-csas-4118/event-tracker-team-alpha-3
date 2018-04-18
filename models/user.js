//Model for user
/*Account has the following pieces of information:
    1. email: Email address of the account's user.
    2. password: Hashed password
    3. firstName: First name of the user.
    4. lastName: Last name of the user.
    5. address: Physical address of the user.
    6. admin: Boolean representing whether this user is an admin.
    7. events: Array holding all of the events the user is registered to.
 */

class User {

    constructor(email, password, firstName, lastName, address) {
        this._email = email;
        this._password = password;
        this._firstName = firstName;
        this._lastName = lastName;
        this._address = address;
        this._admin = false;
        this._events = [];
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(value) {
        this._firstName = value;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        this._lastName = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }

    get admin() {
        return this._admin;
    }

    set admin(value) {
        this._admin = value;
    }

    get events() {
        return this._events;
    }

    set events(value) {
        this._events = value;
    }

}

module.exports = User;
