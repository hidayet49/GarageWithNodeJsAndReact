const mongoose=require('mongoose');



const appointmentSchema=new mongoose.Schema({
    owner:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    problem:{
        type:String,
        required:true,
        min:6
    },
    urgent:{
        type:Boolean,
        required:true,
        default:false
    },
    date:{
        type:String,
        required:false,
    },
    hour:{
        type:String,
        required:false
    },
    approved:{
        type:Boolean,
        required:true,
        default:false
    },
    readed:{
        type:Boolean,
        required:true,
        default:false
    }
})

module.exports=mongoose.model('appointment',appointmentSchema);