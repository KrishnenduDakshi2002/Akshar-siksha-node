const router = require('express').Router();
//MODELS
const User = require('../model/User');
const Student = require('../model/Student');
const Teacher = require('../model/Teacher');
// JSON WEB TOKEN
require('dotenv/config');

// VERIFY TOKEN 
const verify = require('../verifyToken');

router.get('/',verify, async (req,res)=>{

    const userId = req.user._id;
    // const student = await Student.findOne({Student_id : userId});
    const user = await User.findById(userId);

    const Student_dash_query = [
        {
            path : 'Classrooms',
            select : 'Title Subject Description'
        },
        {
            path : 'Student_id',
            select : 'first_name last_name role age email phoneNumber institute'
        },
        {
            path : 'NoticeBoard'
            
        },
        {
            path : 'Evaluation'
            
        },
        {
            path : 'Tests',
            select : 'topic subject dateTime questionPaper'
        }
    ]

    const Teacher_dash_query = [
        {
            path : 'Classrooms',
            select : 'Title Subject Description'
        },
        {
            path : 'Teacher_id',
            select : 'first_name last_name role age email phoneNumber institute'
        },
        {
            path : 'NoticeBoard'
            
        },

        {
            path : 'Tests'
        }
    ]



    if(user){
        if(user.role === 'STUDENT'){
            const student = await Student.findOne({Student_id : userId});
            const updated_student = await student.populate(Student_dash_query);
            res.json({"status":200,"User":updated_student});
        }
        else if(user.role === 'TEACHER'){
            const teacher = await Teacher.findOne({Teacher_id : userId});
            const updated_teacher = await teacher.populate(Teacher_dash_query);
            res.json({"status":200,"User":updated_teacher});
        }
    }else{
        res.json({"status":400,"ErrorMessage":"Error while getting student"});
    }

})

module.exports = router;