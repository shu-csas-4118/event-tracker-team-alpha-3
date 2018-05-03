//Data model for an event.
/* An event is an object that contains the following information
    1. Name: String representing the name of the event.
    2. Email: Email address representing the email address to contact about the event.
    3. Supervisor: Name of the supervisor of the event.
    4. Address: Physical address of the event.
    5. startDate: Starting date of the event.
    6. endDate: Ending date of the event.
    7. Comments: A String representing any other comments about the event.
    8. Registrants: A collection of users registered to this event.
    9. maxRegistrants: Number representing the maximum number of users registered.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema(
    {
        name: String,
        email: String,
        supervisor: String,
        address: String,
        startDate: Date,
        endDate: Date,
        comments: Array,
        registrants: Array,
        maxRegistrants: Number,
        currentRegs: Number,
    }
);

eventSchema.methods.addRegistrant = function (account) {
    if (this.currentRegs >= this.maxRegistrants)
        return "Event-full";
    else if (this.registrants.includes(account))
        return "Already-registered";
    else {
        this.registrants.push(account);
        this.currentRegs++;
        return "Account-added";
    }
};

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
