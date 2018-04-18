//Data model for an event.
/* An event is an onject that contains the following information
    1. Name: String representing the name of the event.
    2. Email: Email address representing the email address to contact about the event.
    3. Supervisor: Name of the supervisor of the event.
    4. Address: Phyiscal address of the event.
    5. startDate: Starting date of the event.
    6. endDate: Ending date of the event.
    7. Comments: A String representing any other comments about the event.
    8. Registrants: A collection of users registered to this event.
    9. maxRegistrants: Number representing the maximum number of users registered.
    10. ID: Number representing the ID of this event.
 */
class Event {

    constructor(name, email, supervisor, address, startDate, endDate, comments, maxRegistrants, ID) {
        this._name = name;
        this._email = email;
        this._supervisor = supervisor;
        this._address = address;
        this._startDate = startDate;
        this._endDate = endDate;
        this._comments = comments;
        this._registrants = [];
        this._maxRegistrants = maxRegistrants;
        this._ID = ID;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get supervisor() {
        return this._supervisor;
    }

    set supervisor(value) {
        this._supervisor = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }

    get startDate() {
        return this._startDate;
    }

    set startDate(value) {
        this._startDate = value;
    }

    get endDate() {
        return this._endDate;
    }

    set endDate(value) {
        this._endDate = value;
    }

    get comments() {
        return this._comments;
    }

    set comments(value) {
        this._comments = value;
    }

    get maxRegistrants() {
        return this._maxRegistrants;
    }

    set maxRegistrants(value) {
        this._maxRegistrants = value;
    }

    get ID() {
        return this._ID;
    }

    set ID(value) {
        this._ID = value;
    }

    get registrants() {
        return this._registrants;
    }

    set registrants(value) {
        this._registrants = value;
    }

    addUser(user) {
        this._registrants.push(user);
    }
}

module.exports = Event;