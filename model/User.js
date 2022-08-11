const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId
    },
    first_name:{
        type:String,
        required: true,
        min:1,
        max:255
    },
    last_name:{
        type:String,
        required: true,
        min:1,
        max:255
    },
    role:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        max:255,
        min:10
    },
    phoneNumber:{
        type:String,
        required: true,
        max:10,
        max:10
    },
    address:{
        type:String,
        required: true,
        max:2,
        max:1024
    },
    institute:{
        type:String,
        required: true,
        max:5,
        max:255
    },
    intitute_code:{
        type:String,
        required: true,
        max:3,
        max:255
    },
    password:{
        type:String,
        required: true,
        max:2000,
        min:6
    },
    date_created:{
        type:Date,
        default:Date.now
    }
    
});

// return mongoose.model('User',userSchema)


module.exports = mongoose.model('User',userSchema); // this module "User.js" will export mongoose model object
// module.exports.User = User