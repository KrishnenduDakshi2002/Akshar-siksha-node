const router = require('express').Router();
//MODELS
const User = require('../model/User');
const Student = require('../model/Student');
const Teacher = require('../model/Teacher');
const Classroom = require("../model/Classroom");
const Test = require('../model/Test');
// JSON WEB TOKEN
require('dotenv/config');

// VERIFY TOKEN 
const verify = require('../verifyToken');
const { default: mongoose } = require('mongoose');



router.get('/',verify,async (req,res)=>{

    const userId = req.user._id;
    const teacher = await Teacher.findOne({Teacher_id : userId});
    console.log(teacher);
    if(teacher){
        const updated_teacher = (await (await teacher.populate('Teacher_id')).populate({
            path: 'Classrooms',

            populate : [{path :'Classes'},{path: 'Discussion'}]
        }));
        res.json({"status":200,"teacher":updated_teacher});
    }else{
        res.json({"status":400,"ErrorMessage":"Error while getting student"});
    }
})


// adding other fields
router.post('/add/data',verify, async (req,res)=>{
    const userId = req.user._id;
    
    await Teacher.findOneAndUpdate(
        {Teacher_id: userId},
        {
            $set: {
                Age: req.body.age,
                Gender : req.body.gender
            }
        }

    ).exec(function(err,data){
        if(err){
            res.json({"status":400,"ErrorMessage":"Error while updating data"});
        }else{
            res.json({"status":200,"message":"Successfully updated"});
        }

    })
})


// adding test for a particular classroom
// can only be done by a teacher who is present in that classroom

// classroom_id --> body (req)
// jwt -- > header(req)



module.exports = router;