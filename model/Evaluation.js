const mongoose = require('mongoose');
const Achievement = require('../model/Achievements');
const Homework = require('./Challenges');

const  EvaluationSchema= mongoose.Schema({
    Challenges : [
        {
            type: mongoose.Types.ObjectId,
            ref : 'Challenges'
    
        }
    ],
    
    Achievements : [
        {
            type: mongoose.Types.ObjectId,
            ref : 'Achievements'
        }
    ]
})


module.exports =  mongoose.model('Evaluation',EvaluationSchema); 