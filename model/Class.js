const mongoose = require('mongoose');


const ClassSchema = mongoose.Schema({
    topic: String,
    subject: String,
    teacher : String,
    dateTime: {
        type: Date
    }
})


module.exports =  mongoose.model('Class',ClassSchema); 