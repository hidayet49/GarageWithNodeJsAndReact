const jwt = require('jsonwebtoken')
const User = require('../models/user')


// Verify Token 



module.exports = async function auth(req, res, next) {
    const token = req.header('auth-token');
    //Token Exist or not
    if (!token) {
        return res.status(401).send('Access denied!!');
    }

    // Validate Token
    try {

        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findOne({ _id: verified._id });        
        if (!user) {
            return res.status(401).send('Access denied!!');
        }
        req.user = user
        next()
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
}