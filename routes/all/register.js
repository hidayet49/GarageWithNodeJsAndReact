// This module is for the registration of new user.


const router = require('express').Router();
const User = require('../../models/user');
const bcrypt = require('bcryptjs')
//FOR VALIDATION OF REQUESTS
const { registrationValidation } = require('../../support/validation')
const SALT_VALUE = 10





module.exports = async(req,res)=>{

    // Validate the request
    const { error } = registrationValidation(req.body);
    if (error) {
        res.status(400).send(error.message)
    } else {
        //Fist Check the user email exist or not!
        const emailExist = await User.findOne({ email: req.body.email })
        if (emailExist) {
            return res.status(400).send("The Email is Already exist. If you forgot your password, please click I Forgot! button")
        }

        //Hash password
        const salt = await bcrypt.genSalt(SALT_VALUE);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)


        //Create a new User
        const user = new User({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPassword,
            role: 'CLIENT'
        })
        try {
            const savedUser = await user.save();
            res.json(savedUser);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}