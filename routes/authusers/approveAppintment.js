//This module used for approvement of the appointment
const Appointment= require('../../models/appointment')
module.exports=async(req,res)=>{
    const id=req.query.id;
    if(!id){
        return res.status(400).send('There is not ID');
    }
    try {
       
        const appointment=await Appointment.findOne({_id:id});
        // Check here the authority of the user... If this appointmet is not belong to the user, reject the request
        if(appointment.owner!==req.user.id){
            return res.status(403).send(`You don't have authority to make an approvement!!!`)
        }
         //Approve can make just after date and time..
        //Check if date and time is set or not
        if(!appointment.date || !appointment.hour){
            return res.status(400).send('Please wait for date and time arrangement!!');
        }
        //Update approve field of appointment
        //Check here also the owner to prevent the manipulation of the misusage
        if(appointment.approved){
            return res.send('Your appointment is already approved!') 
        }
        await Appointment.updateOne({_id:id,owner:req.user.id},{approved:true});
        res.send('Your approvement is successfull!')
    } catch (error) {
        console.log(error);
        return res.status(500).send("There is an error occured!! Please try again later!");
    }
}