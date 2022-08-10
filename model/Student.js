const mongoose = require('mongoose');
const User = require('../model/User');

const StudentSchema = new mongoose.Schema({


    student_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    address:{
        type:String,
        min:6,
        max:255
    }
});



module.exports =  mongoose.model('Student',StudentSchema);  // this module "User.js" will export mongoose model object