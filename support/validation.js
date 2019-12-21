const Joi=require('@hapi/joi')
const moment=require('moment')
registrationValidation=(data)=>{
    const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        surname: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
    
        password: Joi.string()
            .min(6)
            .max(30)
            .required()
            .pattern(/^[a-zA-Z0-9]{3,30}$/),
    
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        phone:Joi.string()
            .min(6)
            .max(18)
            .required()
    })

    return schema.validate(data);        

}

loginValidation=(data)=>{
    const schema = Joi.object({
       
    
        password: Joi.string()
            .min(6)
            .max(30)
            .required()
            .pattern(/^[a-zA-Z0-9]{3,30}$/),
    
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    })

    return schema.validate(data);        

}

appointmentValidation=(data)=>{
    // control brand and model 
    const cars=require('../support/cars.json')
    const models = require('../support/car-models.json')
    if(!data.brand){
        data.error={message:'Please select any car!!!'};
        return (data) 
    }
    //if brand is not in our brand list
    if(!(cars.indexOf(data.brand)>-1)){
        data.error={message:'Please select the car from list!!!'};
        return (data);
    }
    //If the model is not in our model list
    let myModels=models.find(element=>element.brand==data.brand)
    if( myModels.models.indexOf(data.model)<0 ){
        data.error={message:'Please select the model from list!!!'};
        return (data);
    }

    //Joi Controlling
    const schema = Joi.object({
       
        problem: Joi.string()
            .min(6)
            .required()
    
    }).unknown()

    return schema.validate(data);
}

dateTimeValidation=(data)=>{
    const schema = Joi.object({
        id:Joi.string(),

        date: Joi.string()
            .min(10).max(10)
            .required(),

        hour:Joi.string()
            .min(5).max(5)
            .required()
    
    })
    const joiValidate=schema.validate(data);
    const {error}= joiValidate;
    if(error){
        return joiValidate;
    }

    if(!moment(data.date).isValid()){
        data.error={message:'Your date value is wrong!!'};
        return data; 
    }
    times=data.hour.split(':');
    
    if(times.length!=2 ) {
        data.error={message:'Your time value is wrong!!'};
        return data;
    }
    if(times[0]<'00' || times[0]>'23' || times[1]<'00' || times[1]>'59'){
        data.error={message:'Your time value is wrong!!'};
        return data;
    }
    data.error=undefined
    return data
}

module.exports.registrationValidation=registrationValidation;
module.exports.loginValidation=loginValidation;
module.exports.appointmentValidation=appointmentValidation;
module.exports.dateTimeValidation=dateTimeValidation;


