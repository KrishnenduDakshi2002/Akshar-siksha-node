const mongoose = require("mongoose");
const User = require('../model/User');
const Teacher = require('../model/Teacher');
const Student = require('../model/Student');
const Course = require('../model/Course');
const Schema = mongoose.Schema;

const instituteSchema = new mongoose.Schema({
  institute_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required : true
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
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

module.exports = mongoose.model("Institute", instituteSchema);
