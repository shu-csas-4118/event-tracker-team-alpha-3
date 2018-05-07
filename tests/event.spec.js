'use strict';

const chai = require('chai');
const mongoose = require('mongoose');
const assert = chai.assert;
const expect = chai.expect;
const Event = require('../models/event');
const Account = require('../models/account');

describe('Event module', function () {

    before(function (done) {
        mongoose.connect('mongodb://localhost/eventtrack');
        done();
    });

    after(function (done) {
        mongoose.connection.close();
        done();
    });

    beforeEach(function (done) {
        const event = new Event({
            name: 'Event Name',
            email: 'EventName@shu.edu',
            supervisor: 'Bill Sam',
            address: '123 bill ave south orange NJ',
            startDate: "12.06.2018",
            endDate: "12.12.2018",
            comments: 'about event',
            maxRegistrants: 2,
            currentRegs: 0,
        });

        event.save(function (error) {
            if (error)
                console.log('error' + error.message);
            done();
        })
    });

    it('should have a function to find an event by name.', function (done) {
        Event.findOne({ name: 'Event Name' }, function (error, event) {
            expect(event.name).to.eql('Event Name');
            done();
        })
    });

    it('should have a function to find an event by start date.', function (done) {
        Event.findOne({ startDate: '12.06.2018'}, function (error, event) {

            expect(event.startDate.toDateString()).to.eql('Thu Dec 06 2018');
            done();
        })
    });

    it('should have a function to find an event by address.', function (done) {
        Event.findOne({ address: '123 bill ave south orange NJ' }, function (error, event) {
            expect(event.address).to.eql('123 bill ave south orange NJ');
            done();
        })
    });


    

    it('should have a function to get the name.', function (done) {
        Event.findOne({ name: 'Event Name' }, function (error, event) {
            expect(event.name).to.eql('Event Name');
            done();
        })
    });

    it('should have a function to get the email.', function (done) {
        Event.findOne({ name: 'Event Name' }, function (error, event) {
            expect(event.email).to.eql('EventName@shu.edu');
            done();
        })
    });
    

    it('should have a function to get the supervisor name.', function (done) {
        Event.findOne({ name: 'Event Name' }, function (error, event) {
            expect(event.supervisor).to.eql('Bill Sam');
            done();
        })
    });

    it('should have a function to get the address of event.', function (done) {
        Event.findOne({ name: 'Event Name' }, function (error, event) {
            expect(event.address).to.eql('123 bill ave south orange NJ');
            done();
        })
    });

    it('should have a function to get the start date.', function (done) {
        Event.findOne({ name: 'Event Name' }, function (error, event) {
            expect(event.startDate.toDateString()).to.eql('Thu Dec 06 2018');
            done();
        })
    });

    it('should have a function to get the end date.', function (done) {
        Event.findOne({ name: 'Event Name' }, function (error, event) {
            expect(event.endDate.toDateString()).to.eql('Wed Dec 12 2018');
            done();
        })
    });

    it('should have a function to get the comments about the event.', function (done) {
        Event.findOne({ name: 'Event Name' }, function (error, event) {
            assert(event.comments, 'about event');
            done();
        })
    });

    it('should have a function to get the max Registrants of event.', function (done) {
        Event.findOne({ name: 'Event Name' }, function (error, event) {
            expect(event.maxRegistrants).to.eql(2);
            done();
        })
    });

    it('should have a function to get the current Registrants of event.', function (done) {
        Event.findOne({ name: 'Event Name' }, function (error, event) {
            expect(event.currentRegs).to.eql(0);
            done();
        })
    });

    it('should have a function to add an account to the list of registrants.', function (done) {

        const account = new Account({
            username: 'johndoe@shu.edu',
            password: 'password',
            admin: false
        });

        const account1 = new Account({
            username: 'doejohn@shu.edu',
            password: 'password',
            admin: false
        });

        Event.findOne({ name: 'Event Name' }, function (error, event) {
            event.addRegistrant(account);
            expect(event.registrants[0]).to.eql(account);

        });

        Event.findOne({ name: 'Event Name'}, function (error, event) {
            event.addRegistrant(account);
            expect(event.currentRegs).to.eql(1);

        });


        Event.findOne({ name: 'Event Name' }, function (error, event) {
            event.addRegistrant(account);
            event.addRegistrant(account1);
            expect(event.addRegistrant(account1)).to.eql("Event-full");

        });

        Event.findOne({ name: 'Event Name' }, function (error, event) {
            event.addRegistrant(account);
            expect(event.addRegistrant(account)).to.eql("Already-registered");
            done();
        });

    });
          
    afterEach(function (done) {
        Event.remove({}, function () {
            done();
        });
    });

});