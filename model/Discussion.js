const mongoose = require('mongoose');


const DiscussionSchema = mongoose.Schema({
    sender :{
        type : String
    },
    topic: String,
    question : String,
    answers : [
        {
            sender : String,
            role: String,
            answer : String
        }
    ]

})


module.exports =  mongoose.model('Discussion',DiscussionSchema); 