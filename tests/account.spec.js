'use strict';

const parser = require('parse-address');
const chai = require('chai');
const mongoose = require('mongoose');
const assert = chai.assert;
const expect = chai.expect;
const Account = require('../models/account');
const Event = require('../models/event');

describe('Account module', function () {

    before(function (done) {
        mongoose.connect('mongodb://localhost/eventtrack');
        done();
    });

    after(function (done) {
        mongoose.connection.close();
        done();
    });

    beforeEach(function (done) {
        const account = new Account({
            username: 'johndoe@shu.edu',
            password: 'password',
            admin: false
        });

        account.save(function (error) {
            if (error)
                console.log('error' + error.message);
            done();
        })
    });

    it('should find a user by their username.', function (done) {
        Account.findOne({ username: 'johndoe@shu.edu' }, function (error, account) {
            expect(account.username).to.eql('johndoe@shu.edu');
            done();
        });
    });

    it('should have a function to get the password.', function (done) {
        Account.findOne({ username: 'johndoe@shu.edu' }, function (error, account) {
            expect(account.password).to.eql('password');
            done();
        })
    });

    it('should have a function to login an account.', function (done) {
        Account.findOne({ username: 'johndoe@shu.edu' }, function (error, account) {
            expect(account.login('johndoe@shu.edu', 'password', {})).to.eql(account);
            done();
        })
    });

    it('should have a function to add a first name.', function (done) {
        Account.findOne({username: 'johndoe@shu.edu'}, function (error, account) {
            account.first = "John";
            expect(account.first).to.eql("John");
            done();
        })
    });

    it('should have a function to add a last name.', function (done) {
        Account.findOne({ username: 'johndoe@shu.edu' }, function (error, account) {
            account.last = "Doe";
            expect(account.last).to.eql("Doe");
            done();
        })
    });

    it('should have a function to add an address.', function (done) {
        Account.findOne({ username: 'johndoe@shu.edu' }, function (error, account) {
            account.address = "400 South Orange Ave, South Orange NJ, 07079";
            expect(account.address).to.eql("400 South Orange Ave, South Orange NJ, 07079");
            done();
        })
    });

    it('should have a function to add an event to the list of events.', function (done) {

        const event = new Event({
            name: 'Event Name',
            email: 'EventName@shu.edu',
            supervisor: 'Bill Sam',
            address: '123 bill ave south orange NJ',
            startDate: '12/4/18',
            endDate: '12/7/18',
            comments: 'about event',
            maxRegistrants: 1,
            currentRegs: 0,
            ID: 'h1245'
        });

        Account.findOne({ username: 'johndoe@shu.edu' }, function (error, account) {
            account.addEvent(event);
            expect(account.events[0]).to.eql(event);
        });

        Account.findOne({ username: 'johndoe@shu.edu' }, function (error, account) {
            account.addEvent(event);
            account.addEvent(event);
            expect(account.events.length).to.eql(1);
            done();
        });

    });

    it('should have a function to check the admin boolean.', function (done) {
        Account.findOne({ username: 'johndoe@shu.edu' }, function (error, account) {
            expect(account.admin).to.eql(false);
            done();
        })
    });

    it('should have a function to update the admin boolean.', function (done) {
        Account.findOne({ username: 'johndoe@shu.edu' }, function (error, account) {
            account.admin = true;
            expect(account.admin).to.eql(true);
            done();
        })
    });

    afterEach(function (done) {
        Account.remove({}, function () {
            done();
        });
    });

});