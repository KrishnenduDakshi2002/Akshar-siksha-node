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

    Age: {
        type: String,
        default : 'N/A'
    },

    Gender: {
        type : String,
        default : 'N/A'
    },

    Guardian_name:{
        type: String,
        default : 'N/A'
    },

    Class : {
        type : String,
        default : 'N/A'
    },

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
    ],
    PinnedClasses : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class'   
        }
    ]

});



module.exports =  mongoose.model('Student',StudentSchema);  // this module "User.js" will export mongoose model object