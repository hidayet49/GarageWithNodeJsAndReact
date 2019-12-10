const mongoose=require('mongoose');



const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:3,
        max:30
    },
    surname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:1024 //may be encrypted
    },
    phone:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('user',userSchema);