var request = require('request'), express = require('express'), assert = require("assert"), http = require("http");

describe('http tests', function() {

    it('should return the login if the url is correct', function(done) {
        http.get('http://localhost:3000/', function(res) {
            assert.equal(200, res.statusCode);
            done();
        })
    });

    it('should not return the home page if the url is wrong', function(done) {
        http.get('http://localhost:3001/test', function(res) {
            assert.equal(404, res.statusCode);
            done();
        })
    });

    it('should login', function(done) {
        request.post('http://localhost:3001/login', {

            form:{
                username : 'vinod1',
                password:'pass'
            }
        }, function(error, response, body) {
            assert.equal(201, response.statusCode);
            done();
        });
    });

    it('SHOULD NOT LOGIN', function(done) {
        request.post('http://localhost:3001/login', {

            form:{
                username: 'sasdads',
                password:'14'
            }
        }, function(error, response, body) {
            assert.equal(401, response.statusCode);
            done();
        });
    });
    it('SHOULD Create Account', function(done) {
        request.post('http://localhost:3001/signup', {

            form:{
                email: 'adsfasdf',
                password:'tasdfadsf',
                firstname:'Ram',
                lastname:'Kasd'
            }
        }, function(error, response, body) {
            assert.equal(401, response.statusCode);
            done();
        });
    });
    it('SHOULD NOT Create Account', function(done) {
        request.post('http://localhost:3001/doSignup', {

            form:{
                email: 'vinod1',
                password:'tasdest123',
                firstname:'Ramasd',
                lastname:'Kassad'
            }
        }, function(error, response, body) {
            assert.equal(404, response.statusCode);
            done();
        });
    });




});