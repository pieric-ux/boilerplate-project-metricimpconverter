const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  suite('API route testing', function() {
    test('Convert valid 10L with GET /api/convert', function (done) {
      chai
        .request(server)
        .get('/api/convert')
        .query({ input: '10L' })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit, 'L');
          assert.equal(res.body.returnNum, 2.64172);
          assert.equal(res.body.returnUnit, 'gal');
          assert.equal(res.body.string, '10 liters converts to 2.64172 gallons');
          done();
        });
    });

    test('Convert invalid unit 32g with GET /api/convert', function (done) {
      chai
        .request(server)
        .get('/api/convert')
        .query({ input: '32g'})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'invalid unit');
          done();
        });
    });

    test('Convert invalid number 3/7.2/4kg with GET /api/convert', function (done) {
      chai
        .request(server)
        .get('/api/convert')
        .query({ input: '3/7.2/4kg'})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'invalid number');
          done();
        });
    });

    test('Convert invalid number AND unit 3/7.2/4kilomegagram with GET /api/convert', function (done) {
      chai
        .request(server)
        .get('/api/convert')
        .query({ input: '3/7.2/4kilomegagram'})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'invalid number and unit');
          done();
        });
    });

    test('Convert no number with GET /api/convert', function (done) {
      chai
        .request(server)
        .get('/api/convert')
        .query({ input: 'gal'})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 1);
          assert.equal(res.body.initUnit, 'gal');
          assert.equal(res.body.returnNum, 3.78541);
          assert.equal(res.body.returnUnit, 'L');
          assert.equal(res.body.string, '1 gallons converts to 3.78541 liters');
          done();
        });
    });
    
  });
});
