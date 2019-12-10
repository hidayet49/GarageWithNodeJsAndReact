// This module is to create a new appointment request

const Appointment= require('../../models/appointment')
const {appointmentValidation}=require('../../support/validation')

module.exports=async (req,res)=>{
    
    const { error } = appointmentValidation(req.body);
    if (error) {
        return res.status(400).send(error.message);
    }
    const appointment= new Appointment({
        owner:req.user._id,
        brand:req.body.brand,
        model:req.body.model,
        problem:req.body.problem,
        urgent:req.body.urgent
    });
    try {
        const savedAppointment = await appointment.save();
        res.send(savedAppointment);
    } catch (error) {
        res.status(400).send(error);
    }

}