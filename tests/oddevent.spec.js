'use strict'

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const Event = require('../models/event');
const User = require('../models/user');

describe('Event module', function() {

    const event = new Event('Test Event', 'test@event.com', 'John Doe',
        {number: '15',
            prefix: '',
            street: 'North',
            type: 'Avenue',
            city: 'NYC',
            state: 'NY',
            zip: '11111'},
        '2018-04-29', '2018-05-01', 'N/A', 10, 1);

    describe('"seed"', function() {
        it('should have a function to select the seed.', function () {
            expect(event.seed).to.be.a('function');
        });
    });

    describe('Selectors', function() {
        it('should have a function to select the name.', function () {
            assert(event.name, 'Test Event');
        });

        it('should have a function to select the email.', function () {
            assert(event.email, 'test@event.com');
        });

        it('should have a function to select the supervisor.', function () {
            assert(event.supervisor, 'John Doe');
        });

        it('should have a function to select the address.', function () {
            assert(event.address,
                {number: '15',
                    prefix: '',
                    street: 'North',
                    type: 'Avenue',
                    city: 'NYC',
                    state: 'NY',
                    zip: '11111'})
        });

        it('should have a function to select the start date.', function () {
            assert(event.startDate, '2018-04-29');
        });

        it('should have a function to select the end date.', function () {
            assert(event.endDate, '2018-05-01');
        });

        it('should have a function to select the comments.', function () {
            assert(event.comments, 'N/A');
        });

        it('should have a function to select the max registrants.', function () {
            assert(event.maxRegistrants, 10);
        });

        it('should have a function to select the registrants list.', function () {
            assert(event.registrants, {});
        });
    });

    describe('Mutators', function () {
        it('should have a function to mutate the name.', function () {
            event.name = 'Test Event 2';
            assert(event.name, 'Test Event 2');
        });

        it('should have a function to mutate the email.', function () {
            event.email = 'test2@event.com';
            assert(event.email, 'test2@event.com');
        });

        it('should have a function to mutate the supervisor.', function () {
            event.supervisor = 'Jane Doe';
            assert(event.supervisor, 'Jane Doe');
        });

        it('should have a function to mutate the start date.', function () {
            event.startDate = '2018-04-30';
            assert(event.startDate, '2018-04-30');
        });

        it('should have a function to mutate the end date.', function () {
            event.endDate = '2018-05-02';
            assert(event.endDate = '2018-05-02');
        });

        it('should have a function to mutate the comments.', function () {
            event.comments = 'Test Event for ETS.';
            assert(event.comments, 'Test Event for ETS');
        });

        it('should have a function to mutate the max registrants.', function () {
            event.maxRegistrants = 20;
            assert(event.maxRegistrants, 20);
        });

        it('should have a function to add a user to the registrants.', function () {
            const user = new User('shamil@shu.edu', 'pass', 'Shamil', 'Dzhatdoyev', 'Na');
            event.addUser(user);
            assert(event.registrants[0], user);
        });

    });

});