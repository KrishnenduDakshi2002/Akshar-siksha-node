const mongoose = require('mongoose');
const Achievement = require('../model/Achievements');
const Homework = require('./Challenges');

const  EvaluationSchema= mongoose.Schema({
    Challenges : [
        {
            type: mongoose.Types.ObjectId,
            ref : 'Challenge'
    
        }
    ],
    
    Achievements : [
        {
            type: mongoose.Types.ObjectId,
            ref : 'Achievement'
        }
    ]
})


module.exports =  mongoose.model('Evaluation',EvaluationSchema); 