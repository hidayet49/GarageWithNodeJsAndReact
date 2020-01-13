// This module is for sign in process  of the users
const User = require('../../models/user');
const bcrypt = require('bcryptjs')
//FOR VALIDATION OF REQUESTS
const { loginValidation } = require('../../support/validation')
//JWT
const jwt=require('jsonwebtoken');
module.exports=async (req,res)=>{
    const { error } = loginValidation(req.body);
    if(error){
        return res.status(400).send(error.message);  
    }
    //email check
    const user=await User.findOne({email:req.body.email});
    if(!user){
        return res.status(400).send("Your email  is wrong");
    }
    // PASSWORD CHECK
    const validPassword=await bcrypt.compare(req.body.password,user.password);
    //if password wrong, send a bad Request and invalid password message
    if(!validPassword){
        return res.status(400).send("Invalid Password");
    }
    //Create and assign aToken
    const token=jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    //Set Header
    res.header('auth-token',token).json({
        message:'You are successfully logged in!!',
        token:token,
        role:user.role
    })
    
    
    //res.headers('auth-token',token).send(token);
}