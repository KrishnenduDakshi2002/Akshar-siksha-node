const mongoose = require('mongoose');


const ChallengeSchema = mongoose.Schema({

    Assinged_Date : {
        type: Date,
        default : Date.now
    },
    Deadline_Date : {
        type: Date,
        
    },
    Title: String,

    Priority : String,

    Difficulty : String,

    Content : String,

    Image : String

});


module.exports =  mongoose.model('Challenge',ChallengeSchema); 