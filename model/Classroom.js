const mongoose = require('mongoose');
const User = require('../model/User');
const Student = require('../model/Student');
const Teacher = require('../model/Teacher');


const ClassroomSchema = new mongoose.Schema({


    classroom_id:{
        type: mongoose.Schema.Types.ObjectId
    },
    title: String,
    description: String,
    students : [
        {
            Student_id : String,
            First_name : String,
            Last_name : String,
            Email : String,
            Gender : String,

        }
    ],
    teachers: [
        {
            Teacher_id : String,
            First_name : String,
            Last_name : String,
            Email : String,
            Gender : String,
        }
    ],

});



module.exports =  mongoose.model('Classroom',ClassroomSchema); 