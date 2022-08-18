const mongoose = require('mongoose');
const User = require('../model/User');
const Classroom = require('../model/Classroom');
const Notice = require('../model/NoticeBoard');
const Evaluation = require('../model/Evaluation');

const StudentSchema = new mongoose.Schema({

// from this we are getting all the necessary details regarding this student stored in User model
// while populating we will populate spefic fields
    Student_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    Age: String,

    Gender: String,

    Guardian_name:String,

    Class : String,

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
    Evaluation:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Evaluation'   
        }
    ,
    Tests : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Test'   
        }
    ]

});



module.exports =  mongoose.model('Student',StudentSchema);  // this module "User.js" will export mongoose model object