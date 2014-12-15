var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('POST /api/createGame', function() {
  it('should respond with createGame event in json array', function(done){
    var cmd = {
      id : "123",
      cmd: "CreateGame",
      user : {
        userName:"Thorri"
      },
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29"
    };

    var req = request(app);
    req
      .post('/api/createGame')
      .type('json')
      .send(cmd)
      .end(function(err,res){
        if (err){
          return done(err);
        }
        res.body.should.be.instanceOf(Array);
        done();
      });
  });
});
