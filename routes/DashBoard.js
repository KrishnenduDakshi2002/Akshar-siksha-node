const router = require('express').Router();
//MODELS
const User = require('../model/User');
const Student = require('../model/Student');
const Teacher = require('../model/Teacher');
// JSON WEB TOKEN
require('dotenv/config');

// VERIFY TOKEN 
const verify = require('../verifyToken');
const Evaluation = require('../model/Evaluation');

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
            select : 'first_name last_name role age email phoneNumber institute address'
        },
        {
            path : 'NoticeBoard'
            
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
        res.json({"status":400,"ErrorMessage":"Error while getting classrooms"});
    }

})
router.get('/classrooms',verify, async (req,res)=>{

    const userId = req.user._id;
    // const student = await Student.findOne({Student_id : userId});
    const user = await User.findById(userId);

    const Student_dash_query = [
        {
            path : 'Classrooms',
            select : 'Title Subject Description'
        }
    ]

    const Teacher_dash_query = [
        {
            path : 'Classrooms',
            select : 'Title Subject Description'
        }
    ]
    if(user){
        if(user.role === 'STUDENT'){
            const student = await Student.findOne({Student_id : userId}).select('Classrooms');
            const classrooms_details = await student.populate(Student_dash_query);
            res.json({"status":200,"Classrooms":classrooms_details});
        }
        else if(user.role === 'TEACHER'){
            const teacher = await Teacher.findOne({Teacher_id : userId}).select('Classrooms');
            const classrooms_details = await teacher.populate(Teacher_dash_query);
            res.json({"status":200,"Classrooms":classrooms_details});
        }
    }else{
        res.json({"status":400,"ErrorMessage":"Error while getting student"});
    }

})
router.get('/tests',verify, async (req,res)=>{

    const userId = req.user._id;
    // const student = await Student.findOne({Student_id : userId});
    const user = await User.findById(userId);

    const Student_dash_query = [
        {
            path : 'Tests',
            select : 'topic subject dateTime questionPaper'
        }
    ]

    const Teacher_dash_query = [
        {
            path : 'Tests'
        }
    ]
    if(user){
        if(user.role === 'STUDENT'){
            const student = await Student.findOne({Student_id : userId}).select('Tests');
            const tests = await student.populate(Student_dash_query);
            res.json({"status":200,"Tests":tests});
        }
        else if(user.role === 'TEACHER'){
            const teacher = await Teacher.findOne({Teacher_id : userId}).select('Tests');
            const tests = await teacher.populate(Teacher_dash_query);
            res.json({"status":200,"Tests":tests});
        }
    }else{
        res.json({"status":400,"ErrorMessage":"Error while getting tests"});
    }

})
router.get('/noticeboard',verify, async (req,res)=>{

    const userId = req.user._id;
    // const student = await Student.findOne({Student_id : userId});
    const user = await User.findById(userId);

    const Student_dash_query = [
        {
            path : 'NoticeBoard'
            
        }
    ]

    const Teacher_dash_query = [
        {
            path : 'NoticeBoard'
            
        }
    ]
    if(user){
        if(user.role === 'STUDENT'){
            const student = await Student.findOne({Student_id : userId}).select('Noticeboard');
            const noticeboard = await student.populate(Student_dash_query);
            res.json({"status":200,"Noticeboard":noticeboard});
        }
        else if(user.role === 'TEACHER'){
            const teacher = await Teacher.findOne({Teacher_id : userId}).select('Noticeboard');
            const noticeboard = await teacher.populate(Teacher_dash_query);
            res.json({"status":200,"Noticeboard":noticeboard});
        }
    }else{
        res.json({"status":400,"ErrorMessage":"Error while getting noticeboard"});
    }

})

router.get('/pinned_classes',verify, async (req,res)=>{

    const userId = req.user._id;
    // const student = await Student.findOne({Student_id : userId});
    const user = await User.findById(userId);

    const Student_dash_query = [
        {
            path : 'Class'
            
        }
    ]

    const Teacher_dash_query = [
        {
            path : 'Class'
            
        }
    ]
    if(user){
        if(user.role === 'STUDENT'){
            const student = await Student.findOne({Student_id : userId}).select('PinnedClasses');
            const pinned_classes = await student.populate(Student_dash_query);
            res.json({"status":200,"pinned_classes":pinned_classes});
        }
        else if(user.role === 'TEACHER'){
            const teacher = await Teacher.findOne({Teacher_id : userId}).select('PinnedClasses');
            const pinned_classes = await teacher.populate(Teacher_dash_query);
            res.json({"status":200,"pinned_classes":pinned_classes});
        }
    }else{
        res.json({"status":400,"ErrorMessage":"Error while getting pinned_classes"});
    }

})

router.get('/evaluation',verify, async (req,res)=>{

    const userId = req.user._id;
    // const student = await Student.findOne({Student_id : userId});
    const user = await User.findById(userId);

    const query = [
        {
            path : 'Challenges'
            
        },
        {
            path : 'Achievements'
            
        }
    ]
    if(user){
        if(user.role === 'STUDENT'){
            const student = await Student.findOne({Student_id : userId}).select('Evaluation');
            const evaluation = await Evaluation.findById(student.Evaluation);
            const populated_evaluation = await Evaluation.populate(query);

            res.json({"status":200,"Evaluation":populated_evaluation});
        }
    }else{
        res.json({"status":400,"ErrorMessage":"Error while getting evaluation"});
    }

})




module.exports = router;