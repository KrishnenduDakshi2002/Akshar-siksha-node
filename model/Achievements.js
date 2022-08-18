const mongoose = require('mongoose');


const AchievementSchema = mongoose.Schema({

    title: String,
    description: String,
    Image : String,

})


module.exports =  mongoose.model('Achievement',AchievementSchema); 