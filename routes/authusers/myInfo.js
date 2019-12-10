// This module is to return the profile information of the authenticated users
module.exports=async(req,res)=>{
    delete req.user.password;
    console.log(req.user.role)
    delete req.user['role'];
    delete req.user.__v;
    res.send(req.user);
}