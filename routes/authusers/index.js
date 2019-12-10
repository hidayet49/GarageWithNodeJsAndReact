const router=require('express').Router();
const myInfo=require('./myInfo')
const autoBrands=require('./autoBrands')
const models=require('./brandModels')
const myAppointments=require('./myAppointments')
const newAppointment=require('./newAppointment')
const approveAppointment=require('./approveAppintment')

// Get the registered and authenticated users info
router.get('/getMyInfo',myInfo);
//Get all auto marken
router.get('/autoBrands',autoBrands);
// Get selected Auto's models
router.get('/brandModels',models);
// Get all appointsments that's belong to client
router.get('/getMyAppointments',myAppointments);
// New Appointment Request
router.post('/newAppointment',newAppointment);
// Approve the appointment
router.patch('/approveAppointment',approveAppointment);

module.exports=router;