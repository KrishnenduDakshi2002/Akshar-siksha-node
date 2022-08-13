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
            Teacher_id : Teacher.Student_id,
            First_name : Teacher.First_name,
            Last_name : Teacher.Last_name,
            Email : Teacher.Email,
            Gender : Teacher.Gender
            
        }
    ],

});



module.exports =  mongoose.model('Classroom',ClassroomSchema); 