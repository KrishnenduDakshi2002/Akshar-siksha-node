const mongoose = require("mongoose");
const User = require('../model/User');
const Student = require('../model/Student');
const Course = require('../model/Course');
const Schema = mongoose.Schema;

const teacherSchema = new mongoose.Schema({
  teacher_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Course",
    },
  ],
});

module.exports = mongoose.model("Teacher", teacherSchema);
