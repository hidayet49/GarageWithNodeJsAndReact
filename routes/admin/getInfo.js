//This module is to return the profile information of admins

module.exports=(req,res)=>{
    res.send(req.user);
}