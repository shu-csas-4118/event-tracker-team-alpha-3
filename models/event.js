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

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var accountSchema = new Schema(
    {
        name: String,
        email = String,
        supervisor = String,
        address = String,
        startDate = String,
        endDate = String,
        comments = Array,
        tregistrants = Array,
        maxRegistrants = Number,
        ID = String
    }
);



module.exports = roster;