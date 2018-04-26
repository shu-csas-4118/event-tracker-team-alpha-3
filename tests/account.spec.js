'use strict';

const chai = require('chai');
const mongoose = require('mongoose');
const assert = chai.assert;
const expect = chai.expect;
const Account = require('../models/account');

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
        const account = new Account({
            username: 'johndoe@shu.edu',
            password: 'password'
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

    it('should have a function to add a first name.', function () {
        
    });

    afterEach(function (done) {
        Account.remove({}, function () {
            done();
        });
    });

});