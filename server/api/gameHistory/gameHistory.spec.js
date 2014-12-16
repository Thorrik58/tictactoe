'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/gameHistory', function() {

  it('should respond with JSON array with created events for game', function(done) {

    request(app)
      .get('/api/gameHistory/123')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        should(res.body).eql(
          [{
            "event": "GameCreated",
            "id": "123",
            "name": "TheFirstGame",
            "timeStamp": "2014-12-02T11:29:29",
            "user": {
              "userName": "Thorri"
            }
          }] );
        done();
      });
  });
});
