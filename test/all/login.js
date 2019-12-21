const expect=require('chai').expect;
const request=require('supertest');
const app=require('../../app');
describe('ALL /login',()=>{  
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
    it('Fail, wrong password test',(done)=>{
        request(app).post('/api/all/login')
        .send({
            email:"test@gmail.com",
            password:"abc1234"
        })
        .then((res)=>{
            expect(res.text).equal('Invalid Password');
            done();
        })
        .catch(error=>done(error))
    })
    it('Fail, wrong email test',(done)=>{
        request(app).post('/api/all/login')
        .send({
            email:"noTest@gmail.com",
            password:"abc1234"
        })
        .then((res)=>{
            expect(res.text).equal('Your email  is wrong');
            done();
        })
        .catch(error=>done(error))
    })
    it('Fail, valid email address check!',(done)=>{
        request(app).post('/api/all/login')
        .send({
            email:"test@gmail",
            password:"abc12345",
        })
        .then((res)=>{         
            expect(400);    
            expect(res.text).equal(`"email" must be a valid email`);
            done();
        })
        .catch(error=>done(error))
    })
    it('Fail, password character validation',(done)=>{
        request(app).post('/api/all/login')
        .send({
            email:"test@gmail.com",
            password:"abc1",
        })
        .then((res)=>{         
            expect(400);    
            expect(res.text).equal(`"password" length must be at least 6 characters long`);
            done();
        })
        .catch(error=>done(error))
    })
})
