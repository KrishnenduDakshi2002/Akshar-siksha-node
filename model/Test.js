const mongoose = require('mongoose');

const TestSchema = mongoose.Schema({
    topic: String,
    subject: String,
    dateTime : {
        type: Date,
        default : Date.now
    },
    questionPaper : String,  // this will be provided by a teacher // this will a firebase link for the question paper
    answerSheet : [
        {
            student_id : String,  // we are taking the id of a student so he/she can't push another answer
            answer: String   // link of the answersheet for the respective student
        }
    ]  // student's answersheet links will be stored in this array

})


module.exports =  mongoose.model('Test',TestSchema); 