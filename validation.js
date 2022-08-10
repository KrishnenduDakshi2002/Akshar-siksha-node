// validation
const joi = require('joi');


const registerValidation = (data)=>{

    const schema = joi.object({
        name:joi.string().min(6).required(),
    
        email: joi.string().min(6).max(255).required().email(),

        phoneNumber : joi.string().min(10).max(10).required(),
    
        password: joi.string().min(6).max(1024).required(),
        password2: joi.ref('password')

    });

    return schema.validate(data);

}

const loginValidation = (data)=>{

    const schema = joi.object({
    
        email: joi.string().min(6).max(255).email(),
        phoneNumber: joi.string(),
        password: joi.string().min(6).max(1024).required()
    });

    return schema.validate(data);
}

const changePassValidation = (data)=>{

    const schema = joi.object({
        password: joi.string().min(6).max(1024).required(),
        password2: joi.ref('password')
    });

    return schema.validate(data);

}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.changePassValidation = changePassValidation;