const expect = require("chai").expect;
const request = require("supertest");
const app = require("../../app");
const conn = require("../../support/dbConnect");
const Appointment=require('../../models/appointment')
describe("AUTHUSERS /approveAppointment", () => {
  var token = null;
  before(done => {
    request(app)
      .post("/api/all/login")
      .send({
        email: "test@gmail.com",
        password: "abc12345"
      })
      .then(async (res) => {
        const header = res.header;
        token = header["auth-token"];
        //make approvement again false after processs
        await Appointment.updateOne({_id:'5de384d45421e054ba3d5675'},{approved:false})
        done();
      })
      .catch(error => done(error));
  });
  after((done) => {  
    //Close the coonection
    conn
      .close()
      .then(() => {
        done();
      })
      .catch(error => done(error));
  });
  
  it("OK, should return OK", done => {
    request(app)
      .patch("/api/authusers/approveAppointment")
      .set(
        "auth-token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGUyN2M0ZTkxYmYxMzMxODJmZDAxNWIiLCJpYXQiOjE1NzUxMjQwOTV9.s6DRsjenZVT1J3fKmbXwBCqGMSjk7WENAnOSWOND4Rw"
      )
      .query({ id: "5de384d45421e054ba3d5675" })
      .then(res => {
        expect(res.text).equal("Your approvement is successfull!")
        done();
      })
      .catch(error => done(error));
  });
  it("FAIL, should return already approved", done => {
    request(app)
      .patch("/api/authusers/approveAppointment")
      .set(
        "auth-token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGUyN2M0ZTkxYmYxMzMxODJmZDAxNWIiLCJpYXQiOjE1NzUxMjQwOTV9.s6DRsjenZVT1J3fKmbXwBCqGMSjk7WENAnOSWOND4Rw"
      )
      .query({ id: "5dffb2591c9d440000578b94" })
      .then(res => {
        console.log(res.text);
        
        //expect(res.text).equal("Please wait for date and time arrangement!!")
        done();
      })
      .catch(error => done(error));
  });
  it("FAIL, should return wait for date and time arrangement", done => {
    request(app)
      .patch("/api/authusers/approveAppointment")
      .set(
        "auth-token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGUyN2M0ZTkxYmYxMzMxODJmZDAxNWIiLCJpYXQiOjE1NzUxMjQwOTV9.s6DRsjenZVT1J3fKmbXwBCqGMSjk7WENAnOSWOND4Rw"
      )
      .query({ id: "5dffb1e21c9d440000578b93" })
      .then(res => {
        expect(res.text).equal("Please wait for date and time arrangement!!")
        done();
      })
      .catch(error => done(error));
  });
  it("FAIL, should return you dont have authority", done => {
    request(app)
      .patch("/api/authusers/approveAppointment")
      .set("auth-token", token)
      .query({ id: "5dffb2591c9d440000578b94" })
      .then(res => {
        expect(res.text).equal("You don't have authority to make an approvement!!!")
        done();
      })
      .catch(error => done(error));
  });
});
