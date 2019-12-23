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
      .get("/api/authusers/getMyInfo")
      .set(
        "auth-token",token)
      .then(res => {
        const {body,status} = res;
        expect(status).equal(200);
        expect(body).to.contain.property("_id");
        expect(body).to.contain.property("name");
        expect(body).to.contain.property("surname");
        expect(body).to.contain.property("email");
        expect(body).to.contain.property("phone");
        done();
      })
      .catch(error => done(error));
  });
  it("FAIL, should return invalid token message", done => {
    request(app)
      .get("/api/authusers/getMyInfo")
      .set(
        "auth-token",
        "eNTEiLCJpYXQiOjE1NzY1OTQ3MTV9.cGVB-hQB041h_AT3tAacU43Fd5AlhVAjDe2uGLDKlIA"
      )
      .then(res => {
        expect(400);
        expect(res.text).equal("Invalid Token");
        done();
      })
      .catch(error => done(error));
  });
  it("FAIL, should access denied by server ", done => {
    request(app)
      .get("/api/authusers/getMyInfo")
      .then(res => {
        expect(res.text).equal("Access denied!!");
        expect(401);
        done();
      })
      .catch(error => done(error));
  });
});
