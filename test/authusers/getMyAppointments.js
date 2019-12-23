const expect = require("chai").expect;
const request = require("supertest");
const app = require("../../app");
const conn = require("../../support/dbConnect");
describe("AUTHUSERS /getMyAppointments", () => {
  var token=null;
  before(done=>{
    request(app).post('/api/all/login')
        .send({
            email:"test@gmail.com",
            password:"abc12345",
        })
        .then((res)=>{
            const header=res.header;
            token=header['auth-token'];
            done();
        })
        .catch(error=>done(error))
  })

  it("OK, should return info of auth user", done => {
    request(app)
      .get("/api/authusers/getMyAppointments")
      .set(
        "auth-token",token)
      .then(res => {
        
        const {body,status} = res;
        expect(status).equal(200);
        expect(body).instanceOf(Array);
        expect(body.length).greaterThan(0);
        expect(body[0]).to.contain.property("_id");
        expect(body[0]).to.contain.property("owner");
        expect(body[0]).to.contain.property("brand");
        expect(body[0]).to.contain.property("model");
        expect(body[0]).to.contain.property("problem");
        expect(body[0]).to.contain.property("readed");
        expect(body[0]).to.contain.property("approved");
        expect(body[0]).to.contain.property("urgent");
        done();
      })
      .catch(error => done(error));
  });
  it("FAIL, should return ", done => {
    request(app)
      .get("/api/authusers/getMyAppointments")
      .set("auth-token","adkasdkadamdamsdakiasdalk")
      .then(res => {
        expect(400);
        expect(res.text).equal("Invalid Token");
        done();
      })
      .catch(error => done(error));
  });
  it("FAIL, should access denied by server ", done => {
    request(app)
      .get("/api/authusers/getMyAppointments")
      .then(res => {
        expect(res.text).equal("Access denied!!");
        expect(401);
        done();
      })
      .catch(error => done(error));
  });
});
