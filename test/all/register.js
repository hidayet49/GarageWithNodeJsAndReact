const expect=require('chai').expect;
const request=require('supertest');
const app=require('../../app');
const conn=require('../../support/dbConnect');
const User = require('../../models/user')

describe('ALL /register',()=>{
    before((done)=>{
        conn.connect()
        .then(async ()=>{
            await User.deleteMany({email:'test@gmail.com'}).then(value=>console.log(`deleted count: ${value.deletedCount}`));
            done();  
        })
        .catch(error=>done(error))   
    })
    it('OK,Create a new registration post',(done)=>{
        request(app).post('/api/all/register')
        .send({
            name:"test2",
            surname:"test",
            email:"test@gmail.com",
            password:"abc12345",
            phone:"123121231"
        })
        .then((res)=>{
            const body=res.body;
            expect(body).to.contain.property('_id');
            expect(body).to.contain.property('name');
            expect(body).to.contain.property('surname');
            expect(body).to.contain.property('email');
            expect(body).to.contain.property('phone');
            done();
        })
        .catch(error=>done(error))
    })
    it('Fail, The existed email test',(done)=>{
        request(app).post('/api/all/register')
        .send({
            name:"test2",
            surname:"test",
            email:"test@gmail.com",
            password:"abc12345",
            phone:"123121231"
        })
        .then((res)=>{
            const body=res.body;
            expect(body).equal('The Email is Already exist. If you forgot your password, please click I Forgot! button');
            done();
        })
        .catch(error=>done(error))
    })
    it('Fail, Fail, valid email address check!',(done)=>{
        request(app).post('/api/all/register')
        .send({
            name:"test2",
            surname:"test",
            email:"test3@gmail",
            password:"abc12345",
            phone:"123121231"
        })
        .then((res)=>{         
            expect(res.status).equal(400);    
            expect(res.text).equal(`"email" must be a valid email`);
            done();
        })
        .catch(error=>done(error))
    })
    it('Fail, password check',(done)=>{
        request(app).post('/api/all/register')
        .send({
            name:"test2",
            surname:"test",
            email:"test3@gmail.com",
            password:"abc1",
            phone:"123121231"
        })
        .then((res)=>{         
            expect(res.status).equal(400);    
            expect(res.text).equal(`"password" length must be at least 6 characters long`);
            done();
        })
        .catch(error=>done(error))
    })
    it('Fail, name check',(done)=>{
        request(app).post('/api/all/register')
        .send({
            name:"t",
            surname:"test",
            email:"test3@gmail.com",
            password:"abc1123123",
            phone:"123121231"
        })
        .then((res)=>{         
            expect(res.status).equal(400);    
            expect(res.text).equal(`"name" length must be at least 3 characters long`);
            done();
        })
        .catch(error=>done(error))
    })
    it('Fail, surname check',(done)=>{
        request(app).post('/api/all/register')
        .send({
            name:"tester",
            surname:"t",
            email:"test3@gmail.com",
            password:"abc1123123",
            phone:"123121231"
        })
        .then((res)=>{         
            expect(res.status).equal(400);    
            expect(res.text).equal(`"surname" length must be at least 3 characters long`);
            done();
        })
        .catch(error=>done(error))
    })
})
