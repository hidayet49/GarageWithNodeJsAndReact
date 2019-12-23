const expect = require("chai").expect;
const request = require("supertest");
const app = require("../../app");
const Appointment=require('../../models/appointment')
describe("AUTHUSERS /newAppointments", () => {
  var token=null;
  var id=null
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

  it("OK, should create new appointent and return information of new ", done => {
    request(app)
      .post("/api/authusers/newAppointment")
      .set("auth-token",token)
      .send(
        {
            "brand":"Mazda",
            "model":"MAZDA2",
            "problem":"I want to change my winter tires..",
            "urgent":true
            
        }
      )
      .then(res => {
        const {body,status} = res;
        expect(status).equal(200);
        expect(body).to.contain.property("_id");
        expect(body).to.contain.property("owner");
        expect(body).to.contain.property("brand");
        expect(body).to.contain.property("model");
        expect(body).to.contain.property("problem");
        expect(body).to.contain.property("readed");
        expect(body).to.contain.property("approved");
        expect(body).to.contain.property("urgent");
        id=body._id;
        done();
      })
      .catch(error => done(error));
  });
  it("FAIL, shouldn't accept because of the car brand", done => {
    request(app)
      .post("/api/authusers/newAppointment")
      .set("auth-token",token)
      .send(
        {
            "brand":"Maz",
            "model":"MAZDA2",
            "problem":"I want to change my winter tires..",
            "urgent":true  
        }
      )
      .then(res => {
        const {status} = res;
        expect(status).equal(400);
        expect(res.text).equal("Please select the car from list!!!");
        done();
      })
      .catch(error => done(error));
  });
  it("FAIL, shouldn't accept because of the car model", done => {
    request(app)
      .post("/api/authusers/newAppointment")
      .set("auth-token",token)
      .send(
        {
            "brand":"Mazda",
            "model":"XXXX",
            "problem":"I want to change my winter tires..",
            "urgent":true  
        }
      )
      .then(res => {
        const {status} = res;
        expect(status).equal(400);
        expect(res.text).equal("Please select the model from list!!!");
        done();
      })
      .catch(error => done(error));
  });
});
