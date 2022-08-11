const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId
    },
    name:{
        type:String,
        required: true,
        min:6,
        max:255
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
    password:{
        type:String,
        required: true,
        max:2000,
        min:6
    },
    date:{
        type:Date,
        default:Date.now
    }
    
});

// return mongoose.model('User',userSchema)


module.exports = mongoose.model('User',userSchema); // this module "User.js" will export mongoose model object
// module.exports.User = User