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
            startDate: '12/4/18',
            endDate: '12/7/18',
            comments: '',
            registrants: {},
            maxRegistrants: 1,
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
          
    afterEach(function (done) {
        Event.remove({}, function () {
            done();
        });
    });

});