const mongoose = require('mongoose');
const User = require('../model/User');

const TeacherSchema = new mongoose.Schema({


    Teacher_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    Age:{
        type: String,
        default : 'N/A'
    },

    Gender: {
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



module.exports =  mongoose.model('Teacher',TeacherSchema);  // this module "User.js" will export mongoose model object