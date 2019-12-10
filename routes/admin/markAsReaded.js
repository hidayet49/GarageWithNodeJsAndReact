// To mark the appointment as readed
const Appointment=require('../../models/appointment')
module.exports=async(req,res)=>{
    const id=req.query.id;
    if(!id){
        return res.status(400).send('ID is required');
    }
    try {
        await Appointment.updateOne({_id:id},{readed:true});
        res.send('Successfully updated');
    } catch (error) {
        res.status(500).send(`There is an error occured.. Error:${error}` );
    }
}