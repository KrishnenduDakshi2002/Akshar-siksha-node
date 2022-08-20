const mongoose = require('mongoose');
const moment = require('moment')

const ChallengeSchema = mongoose.Schema({

    Assinged_Date : {
        type: Date,
        default : moment().utc(true).toDate()   // this will store the local time ( as date obj)
    },
    Deadline_Date : {
        type: Date,
        default : moment().utc(true).toDate()   // this will store the local time ( as date obj)
        
    },
    Title: String,

    Priority : String,

    Difficulty : String,

    Content : String,

    Image : String

});


module.exports =  mongoose.model('Challenge',ChallengeSchema); 