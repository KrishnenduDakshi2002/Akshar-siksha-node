const mongoose = require('mongoose');


const ContributionSchema = new mongoose.Schema({
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category'
    },
    title : String,
    description : String,
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    price : Number,
    location: {
        type: {
          type: String, 
          enum: ['Point'], 
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      },

    date : Date
});


module.exports = mongoose.model('Contribution',ContributionSchema);