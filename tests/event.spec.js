'use strict';

const parser = require('parse-address');
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
            startDate: '12/4/18',
            endDate: '12/7/18',
            comments: '',
            registrants: {},
            maxRegistrants: 3,
            currentRegs: 0,
            ID: 'h1245'
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
            done()
        })
    });

    it('should find a event by ID.', function (done) {
        Event.findOne({ ID: 'h1245' }, function (error, event) {
            expect(event.ID).to.eql('h1245');
            done();
        });
    });

    

    it('should have a function to get the name.', function (done) {
        Event.findOne({ name: 'Event Name'}, function (error, event) {
            expect(event.name).to.eql('Event Name');
            done();
        })
    });

    it('should have a function to get the email.', function (done) {
        Event.findOne({ email: 'EventName@shu.edu'}, function (error, event) {
            expect(event.email).to.eql('EventName@shu.edu');
            done();
        })
    });
    

    it('should have a function to get the supervisor name.', function (done) {
        Event.findOne({ supervisor: 'Bill Sam'}, function (error, event) {
            expect(event.supervisor).to.eql('Bill Sam');
            done();
        })
    });

    it('should have a function to get the address of event.', function (done) {
        Event.findOne({address: '123 bill ave south orange NJ'}, function (error, event) {
            expect(event.address).to.eql('123 bill ave south orange NJ');
            done();
        })
    });

    it('should have a function to get the start date.', function (done) {
        Event.findOne({ startDate: '12/4/18'}, function (error, event) {
            expect(event.startDate).to.eql('12/4/18');
            done();
        })
    });

    it('should have a function to get the end date.', function (done) {
        Event.findOne({endDate:'12/7/18'}, function (error, event) {
            expect(event.endDate).to.eql('12/7/18');
            done();
        })
    });

    it('should have a function to get the comments about the event.', function (done) {
        Event.findOne({ comments: 'about event'}, function (error, event) {
            expect(event.comments).to.eql('about event');
            done();
        })
    });

    it('should have a function to get the max Registrants of event.', function (done) {
        Event.findOne({ maxRegistrants: 1}, function (error, event) {
            expect(event.maxRegistrants).to.eql(1);
            done();
        })
    });

    it('should have a function to get the max Registrants of event.', function (done) {
        Event.findOne({ currentRegs: 0}, function (error, event) {
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

        Event.findOne({ ID: 'h1245' }, function (error, event) {
            event.addRegistrant(account);
            expect(event.registrants[0]).to.eql(account);
        });

        

    });
          
    afterEach(function (done) {
        Event.remove({}, function () {
            done();
        });
    });

});