//This module is to set the date and time of the appointment

const Appointment=require('../../models/appointment')
const {dateTimeValidation}=require('../../support/validation')

module.exports=async(req,res)=>{
    const {error}=dateTimeValidation(req.body);
    
    if(error){
        return res.status(400).send(error.message);
    }
    try {
        await Appointment.updateOne({_id:req.body.id},{hour:req.body.hour,date:req.body.date});
        res.send('Successfully updated!!!')
    } catch (error) {
        res.status(500).send(`There is an error occured.. Error:${error}` );
    }
    
}