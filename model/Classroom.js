const mongoose = require('mongoose');
const User = require('../model/User');
const Student = require('../model/Student');
const Teacher = require('../model/Teacher');
const Class = require('../model/Class');
const Evaluation = require('../model/Evaluation');
const Material = require('../model/Materials');
const Discussion = require('../model/Discussion');

const ClassroomSchema = new mongoose.Schema({


    Title: String, // Title of classroom
    Subject : String, // SUbject of classroom
    Description: String, // description of classroom
    // all the studuents that are enrolled in a classroom
    created_at: {
        type: Date,
        default : Date.now
    },
    Students:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }
    ],
    // Stores all teachers assigned to a particular classroom 
    Teachers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Teacher'
        }
    ],
    //this will store all the classes for a specific classroom( like Physics classroom)
    Classes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class'
        }
    ],
    // all materials will be published here by teacher/ teachers
    Materials:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Material'   
        }
    ],
    Discussion:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Discussion'   
        }
    ]
});



module.exports =  mongoose.model('Classroom',ClassroomSchema); 