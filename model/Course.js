const mongoose = require("mongoose");
const Teacher = require('../model/Teacher');
const Student = require('../model/Student');
const Institute = require('../model/Institute');
const Schema = mongoose.Schema;

const courseSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  Title: {
    type: String,
    required: true,
  },
  Date_created: {
    type: Date,
    default: Date.now,
    required: true,
  },
  Duration: {
    type: String,
    required: true,
  },
  Class: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Course", courseSchema);
