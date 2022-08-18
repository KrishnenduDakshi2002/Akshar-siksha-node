const mongoose = require('mongoose');
const User = require('../model/User');

const TeacherSchema = new mongoose.Schema({


    Teacher_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    Age: String,

    Gender: String,

    Classrooms : [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Classroom'
        }
    ],
    NoticeBoard:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'Notice'
        }

    ],
    Tests : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Test'   
        }
    ]


});



module.exports =  mongoose.model('Teacher',TeacherSchema);  // this module "User.js" will export mongoose model object