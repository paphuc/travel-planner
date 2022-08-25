process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/server/index');
let should = chai.should();

chai.use(chaiHttp);
describe('Plan', () => {
    let today = new Date();
    describe('/GET pets', () => {
        it('it should GET all the pets', (done) => {
          setTimeout( function () {
            chai.request(server)
                .get('/plan?city=london&departing='+ today)
                .end((err, res) => {
                  res.status.should.be.equal(200);
                    done();
                });
              }, 100);
        });
    });
});