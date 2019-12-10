
const Appointment= require('../../models/appointment')

module.exports=async(req,res)=>{
    const appointments=await Appointment.find({owner:req.user._id});
    
    res.send(appointments);
}