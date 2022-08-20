const mongoose = require('mongoose');
const moment = require('moment')


const DiscussionSchema = mongoose.Schema({
    sender :{
        type : String
    },
    topic: String,
    question : String,
    created_at:{
        type: Date,
        default : moment().utc(true).toDate()   // this will store the local time ( as date obj)
    },
    answers : [
        {
            sender : String,
            role: String,
            answer : String
        }
    ]

})


module.exports =  mongoose.model('Discussion',DiscussionSchema); 