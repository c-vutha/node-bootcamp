const asset = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./app');
const should = chai.should();

const baseUrl = `http://localhost:3000`;

chai.use(chaiHttp);
chai.config.includeStack = false;

describe('AUTH', () => {
  describe('Home', () => {
    it('Should show homepage', done => {
      chai
        .request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe('Signup', () => {
    it('Should Signup a user account', done => {
      chai
        .request(server)
        .post('/signup')
        .send({ username: 'c-vutha', password: 'abc@123' })
        .end((err, res) => {
          res.should.have.status(200);
          //   console.log('Response: ', res.body);
          res.body.token.should.not.be.null;
          done();
        });
    });
  });
});
