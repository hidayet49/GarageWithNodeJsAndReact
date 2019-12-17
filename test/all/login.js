const expect=require('chai').expect;
const request=require('supertest');
const app=require('../../app');
const conn=require('../../support/dbConnect');
const User = require('../../models/user')

describe('ALL /login',()=>{  
    // after test
    after((done)=>{
        conn.close()
        .then(()=>{
 
            done()
        })
        .catch(error=>done(error));
        
    })
    it('OK,login to system',(done)=>{
        request(app).post('/api/all/login')
        .send({
            email:"test@gmail.com",
            password:"abc12345",
        })
        .then((res)=>{
            const header=res.header;
            expect(header).to.contain.property('auth-token');
            done();
        })
        .catch(error=>done(error))
    })
})
