const mongoose = require('mongoose');
const User = require('../model/User');

const TeacherSchema = new mongoose.Schema({


    Teacher_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    First_name: String,

    Last_name : String,

    Email: String,

    Date_of_join: Date ,

    Age: String,

    Gender: String,

    Gurdian_name:String,

    Classroom : [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Classroom'
        }
    ],


});



module.exports =  mongoose.model('Teacher',TeacherSchema);  // this module "User.js" will export mongoose model object