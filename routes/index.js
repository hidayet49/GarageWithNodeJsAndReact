const authusers=require('./authusers')
const all=require('./all')
const admin =require('./admin')
const verify=require('../support/verifyToken')
const permit=require('../support/permit')

module.exports=function (app) {
    // ROUTER MIDDLEWARES
    //Avaliable for all users
    app.use('/api/all',all);
    //Avaliable for authenticaticated clients and administrators 
    //First verify if connection has JWT token, 
    //Then check permittance as ADMIN or CLIENT role, then next to admin route
    app.use('/api/authusers',verify,permit('CLIENT','ADMIN'),authusers);
    //Avaliable for just administrators.. first verify if connection has JWT token, 
    //then check permittance as ADMIN role, then next to admin route
    app.use('/api/admin',verify,permit('ADMIN'),admin)
}