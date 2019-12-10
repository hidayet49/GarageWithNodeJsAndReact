const router=require('express').Router();
const getinfo=require('./getInfo')
const getAppointments=require('./getAppointments')
const markAsReaded=require('./markAsReaded')
const setDateTime=require('./setDateTime')
// Get profile information of admin users
router.get('/getinfo',getinfo);
// Get the appointments
router.get('/getAppointments',getAppointments);
// Mark the appointment as readed
router.patch('/markAsReaded',markAsReaded);
//set date and time of the appointment
router.patch('/setDateTime',setDateTime);

module.exports=router;