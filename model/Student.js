const mongoose = require('mongoose');
const User = require('../model/User');
const Teacher = require('../model/Teacher');
const Course = require('../model/Course');

const StudentSchema = new mongoose.Schema({


    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      teachers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Teacher",
        },
      ],
      courses: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
      ],
});



module.exports =  mongoose.model('Student',StudentSchema);  // this module "User.js" will export mongoose model object