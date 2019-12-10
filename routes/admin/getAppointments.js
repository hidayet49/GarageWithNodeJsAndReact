// This module return appointments of clients..
//Also admin user can also reach the specific appointment, such as just not readed before

const Appointment=require('../../models/appointment')

module.exports=async(req,res)=>{
    // user id
    const id=req.query.id;
    // when the appointment not readed and repairman want to see just unreaded appointments
    const unReaded=(req.query.unReaded=='true')
    

    //both of the params is null or undefined, get all appointments
    if(!id && !unReaded){
        const appointments=await Appointment.find({})
        res.send(appointments)
    }
    //if id is null and unReaded is not null, get all unreaded appointments
    else if(!id && unReaded){
        const appointments=await Appointment.find({readed:false})
        res.send(appointments)
    }
    //if id is not null and unreaded is null, get all appointments that belongs to this user
    else if(id && !unReaded){
        const appointments=await Appointment.find({owner:id})
        res.send(appointments)
    }
    // if id is not null and unreaded is not null, get all unreaded appointments that belongs to this user
    else{
        const appointments= await Appointment.find({owner:id,readed:false})
        res.send(appointments)
    }
}