'use strict';

const chai = require('chai');
const mongoose = require('mongoose');
const assert = chai.assert;
const expect = chai.expect;
const Events = require('../models/event');

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
            username: 'johndoe@shu.edu',
            password: 'password',
            name: 'Event Name',
            email: 'EventName@shu.edu',
            supervisor: 'Bill Sam',
            address: '123 bill ave south orange NJ',
            startDate: '12/4/18',
            endDate: '12/7/18',
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

          
    afterEach(function (done) {
        Account.remove({}, function () {
            done();
        });
    });

});