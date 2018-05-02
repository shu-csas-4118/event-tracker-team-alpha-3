'use strict';

const parser = require('parse-address');
const chai = require('chai');
const mongoose = require('mongoose');
const assert = chai.assert;
const expect = chai.expect;
const Events = require('../models/event');
const Accounts = require('../models/account');

describe('Account module', function () {
    before(function (done) {
        const db = mongoose.connect('mongodb://localhost/eventtrack');
        done();
    });

    after(function (done) {
        mongoose.connection.close();
        done();
    });

    beforeEach(function (done) {
        const event = new event({
           
            name: 'Event Name',
            email: 'EventName@shu.edu',
            supervisor: 'Bill Sam',
            address: '123 bill ave south orange NJ',
            startDate: '12/4/18',
            endDate: '12/7/18',
            comments: 'about event',
            maxRegistrants: 50,
            ID: 'h1245'
        });

        event.save(function (error) {
            if (error)
                console.log('error' + error.message);
            done();
        })
    });

    it('should find a event by ID.', function (done) {
        Events.findOne({ ID: 'h1245' }, function (error, event) {
            expect(event.ID).to.eql('h1245');
            done();
        });
    });

    

    it('should have a function to get the name.', function (done) {
        Events.findOne({ name: 'Event Name'}, function (error, event) {
            expect(event.name).to.eql('Event Name');
            done();
        })
    });

    it('should have a function to get the email.', function (done) {
        Events.findOne({ email: 'EventName@shu.edu'}, function (error, event) {
            expect(event.email).to.eql('EventName@shu.edu');
            done();
        })
    });
    

    it('should have a function to get the supervisor name.', function (done) {
        Events.findOne({ supervisor: 'Bill Sam'}, function (error, event) {
            expect(event.supervisor).to.eql('Bill Sam');
            done();
        })
    });

    it('should have a function to get the address of event.', function (done) {
        Events.findOne({address: '123 bill ave south orange NJ'}, function (error, event) {
            expect(event.address).to.eql('123 bill ave south orange NJ');
            done();
        })
    });

    it('should have a function to get the start date.', function (done) {
        Events.findOne({ startDate: '12/4/18'}, function (error, event) {
            expect(event.startDate).to.eql('12/4/18');
            done();
        })
    });

    it('should have a function to get the end date.', function (done) {
        Events.findOne({endDate:'12/7/18'}, function (error, event) {
            expect(event.endDate).to.eql('12/7/18');
            done();
        })
    });

    it('should have a function to get the comments about the event.', function (done) {
        Events.findOne({ comments: 'about event'}, function (error, event) {
            expect(event.comments).to.eql('about event');
            done();
        })
    });

    it('should have a function to get the max Registrants of event.', function (done) {
        Events.findOne({ maxRegistrants: 50}, function (error, event) {
            expect(event.maxRegistrants).to.eql(50);
            done();
        })
    });

    it('should have a function to add an account to the list of registrants.', function (done) {

        const account = new Account({
            username: 'johndoe@shu.edu',
            password: 'password',
            admin: false
        });

        Events.findOne({ ID: 'h1245' }, function (error, event) {
            event.addRegistrant(account);
            expect(event.registrants[0]).to.eql(account);
        });

        Account.findOne({  ID: 'h1245' }, function (error, event) {
            account.addEvent(account);
            account.addEvent(account);
            expect(account.registrants.length).to.eql(1);
            done();
        });

    });
          
    afterEach(function (done) {
        Account.remove({}, function () {
            done();
        });
    });

});