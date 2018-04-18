const User = require('../models/user');
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

describe('User module', function() {

    const acct = new User('shamil.d11@gmail.com', 'password', 'Shamil', 'Dzhatdoyev',
        {number: '15',
            prefix: '',
            street: 'North',
            type: 'Avenue',
            city: 'NYC',
            state: 'NY',
            zip: '11111'});

    describe('Selectors', function() {
        it('should have a function to select the email.', function () {
            assert(acct.email, 'shamil.d11@gmail.com');
        });

        it('should have a function to select the password.', function () {
            assert(acct.password, 'password');
        });

        it('should have a function to select the first name.', function () {
            assert(acct.firstName, 'Shamil');
        });

        it('should have a function to select the last name.', function () {
            assert(acct.lastName, 'Dzhatdoyev');
        });

        it('should have a function to select the address.', function () {
            assert(acct.address,
                {number: '15', prefix: '', street: 'North', type: 'Avenue',
                    city: 'NYC', state: 'NY', zip: '11111'})
        });

        it('should have a function to select the admin boolean.', function () {
            assert(!acct.admin);
        });
    });

    describe('Mutators', function () {
        it('should have a function to mutate its email address.', function () {
            acct.email ='shamil.dzhatdoyev@student.shu.edu';
            assert(acct.email, 'shamil.dzhatdoyev@student.shu.edu');
        });

        it('should have a function to mutate its first name.', function () {
            acct.firstName = 'John';
            assert(acct.firstName, 'John');
        });

        it('should have a function to mutate its last name.', function () {
            acct.lastName = 'Doe';
            assert(acct.lastName, 'Doe');
        });

        it('should have a function to mutate its password.', function () {
            acct.password = 'newpass';
            assert(acct.password, 'newpass');
        });

        it('should have a function to mutate the admin boolean.', function () {
            acct.admin = true;
            assert(acct.admin);
        });
    });
});