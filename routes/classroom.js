const router = require('express').Router();
//MODELS
const User = require('../model/User');
const Student = require('../model/Student');
const Teacher = require('../model/Teacher');
const Classroom = require('../model/Classroom');
const Class = require('../model/Class');
const Discussion = require('../model/Discussion');
const Material = require('../model/Materials');
const Test = require('../model/Test');



const jwt = require('jsonwebtoken');
const verify = require('../verifyToken');


const { default: mongoose } = require('mongoose');


require('dotenv/config');



//// *************************************************************** CREATE CLASS IN CLASSROOM *******************************************************************


// as authentication it takes JWT in request headers

// A teacher will create a class under a particular classroom
// classroom_id : ---> body (req)
router.post("/create/class",verify,async (req,res)=>{

    const teacher_id = req.user._id;
    const teacher = Teacher.findOne({_id:teacher_id});

    const classroom_id = mongoose.Types.ObjectId(req.body.classroom_id);

    if(teacher){
        const class_name = new Class({
            topic: req.body.topic,
            subject: req.body.subject,
            teacher : req.body.teacher,
            dateTime: new Date(req.body.dateTime)
        })
        const newClass = await class_name.save();

        // adding this class automatically to the classroom to belongs to 
        await Classroom.findByIdAndUpdate(classroom_id,{
            $addToSet : {
                Classes : newClass._id
            }
        })

        res.json({'status':201,'class_id':newClass._id.valueOf()});
    }else{
        res.json({"ErrorMessage":400});
    }

})


//// *************************************************************** CREATE CLASSROOM  *******************************************************************


// Teacher will create classroom with no classes for now his teacher id
// jwt token for teacher --> headers
router.post('/',verify,async (req,res)=>{

    const teacher_id = req.user._id;

    const teacher = await Teacher.findOne({Teacher_id :teacher_id});
    if(teacher){
        const classroom = new Classroom({
            Title : req.body.title,
            Subject : req.body.subject,
            Description : req.body.description,
            // student 
            //teacher will be added here
            Teachers : [teacher_id],
            // material
            // discussion
            // test
        })

        const newClassroom = await classroom.save();

        // adding classroom id to the teacher who created it

        await teacher.updateOne({
            $addToSet : {
                Classrooms : newClassroom._id
            }
        })

        const classroom_code = newClassroom._id.valueOf();
        // as a response this will give classroom id to join other teachers
        // and students to join this classroom
        res.json({"status":201,"classroom_code":classroom_code});
    }else{
        res.json({"status":400});
    }

})

//// *************************************************************** DELETE A CLASSROOM  *******************************************************************

router.delete('/delete/:classroom_id',verify, async(req,res)=>{

    const teacher_id = req.user._id;
    const classroom_id = mongoose.Types.ObjectId(req.params.classroom_id);
    const classroom = await Classroom.findOne({_id: classroom_id , Teachers :[teacher_id]})

    if(classroom){
        
        try {
            await Student.updateMany({
                Classrooms : [classroom_id]   // students who have classroom_id in their classroom array will be selected
            }, 
            {
                $pull :{
                    Classrooms : classroom_id
                }
            })

            await Teacher.updateMany({
                Classrooms : [classroom_id]   // teachers who have classroom_id in their classroom array will be selected
            }, 
            {
                $pull :{
                    Classrooms : classroom_id
                }
            })

            // now finally deleting the classroom from database
            const del_res = await classroom.deleteOne({_id:classroom_id});
            res.json({"status":200,"message":"Classroom deleted successfully","delete_response":del_res});
            
        } catch (error) {
            res.json({"status":400,"message":"from catchin error"});
        }
    }else{
        res.json({"status":400,"message":"classroom or teacher doesn't exists"});
    }


})

//// *************************************************************** ADD MEMBERS TO A CLASSROOM  *******************************************************************


// for adding students to a classroom

// jwt token for student or teacher --> headers
// classroom id ---> body(req)

// efficicent query

// https://logfetch.com/mongoose-id-exists/  

router.post('/add/member',verify,async(req,res)=>{
    const member_id = req.user._id;
    const member = await User.findOne({_id:member_id}); 
    const classroom_id = mongoose.Types.ObjectId(req.body.classroom_id);

    if(member.role === 'STUDENT'){

        const id_student = await Student.findOne({Student_id : member_id})._id;  // this is the id of an individual student(not student_id)
        const student_exists = await Classroom.find({_id: classroom_id, Students:{ $in : [id_student]}});
        if(student_exists.length){
            res.json({"status":400,"ErrorMessage":"Student is already enrolled"});
            return;
        }
        Classroom.findByIdAndUpdate(
            classroom_id,  // we just need to provide the id
            {
                $addToSet : {    // instead $push we use $addToSet  to prevent duplicacy
                    Students : id_student
                }
            },
            function(err,data){
                if(err) res.json({"ErrorMessage":"Error while enrolling student"});
                else{
                    res.json({"status":201,"results":data});
                }
            }
        )
    }else if(member.role === 'TEACHER'){    

        const id_teacher = await Teacher.findOne({Teacher_id : member_id})._id; 
        const teacher_exists =  await Classroom.find({_id: classroom_id, Teachers:{ $in : [id_teacher]}});
        if(teacher_exists.length){
            res.json({"status":400,"ErrorMessage":"Teacher is already enrolled"});
            return;
        }
        
        Classroom.findByIdAndUpdate(
            classroom_id,  // we just need to provide the id
            {
                $addToSet : {    // instead $push we use $addToSet  to prevent duplicacy
                    Teachers : id_teacher
                }
            },
            function(err,data){
                if(err) res.json({"ErrorMessage":"Error while enrolling teacher"});
                else{
                    res.json({"status":201,"results":data});
                }
            }
        )
    }else{
        res.json({"ErrorMessage":"Error while adding member"});
    }
})


//                                          $$$$$$$$$$$$$$$$$$  DON'T USE IT, USE THE CREATE CLASS $$$$$$$$$$$$$$$$$$$$$

//// *************************************************************** ADD CLASS IN CLASSROOM *******************************************************************

// ADD CLASS IN A CLASSROOM

// purpose : Adding classes to classroom
// jwt token for teacher who is adding classes --> headers
// classroom id ---> body(req)
// class id ---> body (req)
router.post('/add/class',verify,async(req,res)=>{
    const teacher_id = req.user._id;
    const teacher = await User.findOne({_id:teacher_id});
    const class_id = mongoose.Types.ObjectId(req.body.class_id);
    const classroom_id  = mongoose.Types.ObjectId(req.body.classroom_id);

    if(teacher){

        const classroom = await Classroom.find({_id: classroom_id, Classes:{ $in : [class_id]}});

        if(classroom.length){
            res.json({"status":400,"ErrorMessage":"class is already added"});
            return;
        }
        Classroom.findByIdAndUpdate(
            classroom_id,
            {
                $addToSet:{
                    Classes : class_id
                }
            },
            function(err,data){
                if(err) res.json({"ErrorMessage":"Error while enrolling class"});
                else{
                    res.json({"status":201,"results":data});
                }
            }
        )
    }else{
        res.json({'status':400, 'ErrorMessage' : "Teacher doesn't exists"});
    }
})




//// *************************************************************** ADD DISCUSSION TO A CLASSROOM *******************************************************************



// 

// discussion add route

// Adding question to discussion forum
// adding a discussion to a particular classroom
// classroom_id ---> body (req)

router.post('/discussion/add/question',verify,async (req,res)=>{
    const userId = req.user._id;
    const user = await User.findById(userId);
    const classroom_id = mongoose.Types.ObjectId(req.body.classroom_id);
    if(user){
        const discussion = new Discussion({
            sender: user.first_name.concat(" ").concat(user.last_name),
            topic: req.body.topic,
            question : req.body.question
        });

        const newDiscussion = await discussion.save();

        // adding to a classroom which it belongs to 

        await Classroom.findByIdAndUpdate(classroom_id,{
            $addToSet:{
                Discussion : newDiscussion._id
            }
        })

        res.json({"status":201,"question_id":newDiscussion._id.valueOf()})
    }else{
        res.json({"status":400,"ErrorMessage":"User doesn't exist"})
    }
})


//// *************************************************************** ADD ANSWER TO A DISCUSSION *******************************************************************


// ADD ANSWER TO A DISCUSSION ROUTE

// Adding answer to a discussion forum
// adding a discussion to a particular classroom
// question_id ---> body(req)
// classroom_id ---> body (req)
router.post('/discussion/add/answer',verify,async (req,res)=>{
    const userId = req.user._id;
    const user = await User.findById(userId);

    const question_id = mongoose.Types.ObjectId(req.body.question_id);
    if(user){
        var answerBody = {
            sender : user.first_name.concat(" ").concat(user.last_name),
            role: user.role,
            answer : req.body.answer
        }

        const discussion = await Discussion.findById(question_id);
        const newAnswer = await discussion.update({
            $addToSet :{
                answers: answerBody
            }
        })
        res.json({"status":201,"answer_id":newAnswer,"msg":"done"}) /// i need to return the new answer's id for (different operations like upate, delete)
    }else{
        res.json({"status":400,"ErrorMessage":"User doesn't exist or question doesn't exists"})
    }
})


//// *************************************************************** GET DETAIL OF A CLASSROOM *******************************************************************


// GET CLASSROOM DETAILS ROUTE

/// get all the present classes for a particular classroom
router.get('/get/classes/:classroom_id',async (req,res)=>{
    const classroom_id = mongoose.Types.ObjectId(req.params.classroom_id);
    const classroom = await Classroom.findOne({_id:classroom_id});

    if(classroom){
        // now i have to populate the classroom's classes array
        const classes = await classroom.populate({path : 'Classes'}); // this will only return these three fields
        res.json({"status":200,"classes":classes.Classes}); // now it will return only Classes

    }else{
        res.json({"ErrorMessage":"Error while getting classroom","status":400});
    }

})


//// *************************************************************** get all classroom details *******************************************************************

// https://stackoverflow.com/questions/21069813/mongoose-multiple-query-populate-in-a-single-call

router.get('/get/classroom/details/:classroom_id', async(req,res)=>{
    const classroom_id = mongoose.Types.ObjectId(req.params.classroom_id);
    const classroom = await Classroom.findOne({_id:classroom_id});

    const query = [
        {
            path : 'Classes'
        },
        {
            path : 'Discussion'
        },
        {
            path : 'Materials',
            populate :{
                path : 'provided_by',
                select : 'first_name last_name role'
            }
        },
        {
            path: 'Students',
            select: 'Student_id',  // it can be modified as per requirements
            populate :{
                    path : 'Student_id',
                    select :'first_name last_name email phoneNumber'
                }
        },
        {
            path :'Teachers',
            select: 'Teacher_id',  
            populate :{
                    path : 'Teacher_id',
                    select :'first_name last_name email phoneNumber'
                }
        }
    ]


    if(classroom){
        
        const classroomDetails = await classroom.populate(query);

        res.json({"status":200,"classroom_details":classroomDetails}); // now it will return only Classes

    }else{
        res.json({"ErrorMessage":"Error while getting all details of classroom","status":400});
    }

})


//// *************************************************************** Getting materials  *******************************************************************


router.post('/post/materials/:classroom_id', verify,async(req,res)=>{
    const user_id = req.user._id;
    const classroom_id = mongoose.Types.ObjectId(req.params.classroom_id);
    const classroom = await Classroom.findOne({_id:classroom_id});

    if(classroom){
        const material = new Material({
            provided_by : user_id,
            link : req.body.link,
            topic : req.body.topic
        });

        const newMaterial = await material.save();

        // adding material'd id to classroom

        await Classroom.findByIdAndUpdate(classroom_id,{
            $addToSet:{
                Materials : newMaterial._id
            }
        })

        res.json({"status":201}); // now it will return only Classes

    }else{
        res.json({"ErrorMessage":"Error while creating material","status":400});
    }
})


//// *************************************************************** creating tests *******************************************************************

router.post('/create/test/:classroom_id',verify,async (req,res)=>{
    const teacher_id = req.user._id;
    const classroom_id = mongoose.Types.ObjectId(req.params.classroom_id);
    const classroom = await Classroom.findOne({_id: classroom_id, Teachers : teacher_id});

    if(classroom){
        const test = new Test({
            topic: req.body.topic,
            subject: req.body.subject,
            dateTime : new Date(req.body.date),
            questionPaper : req.body.questionPaper
        })

        const newTest = await test.save();

        // lets add the test id to all the student's test array who are enrolled in this classroom
        await Student.updateMany({Classrooms : classroom_id},{
            $addToSet :{
                Tests : newTest._id
            }
        })

        // also adding this test to the teacher's test array so he/she can check the student's answersheet
        await Teacher.findOneAndUpdate(
            {Teacher_id : teacher_id},
            {
                $addToSet :{
                    Tests : newTest._id
                }
            }
        )

        res.json({"status":201,"test_id":newTest._id.valueOf()});
    
    }else{
        res.json({"ErrorMessage":"Classroom or Teacher doesn't exists"})
    }
    
})



//// *************************************************************** REFRESH CONTROL *******************************************************************
//// ***************************************************************************************************************************************************


router.get('/get/refresh/:refresh_mode/:classroom_id', async(req,res)=>{
    const refresh_mode = req.params.refresh_mode.toLowerCase();
    // refresh_mode ->  today_class , scheduled_class, student, teacher, materials, discussion

    const classroom_id = mongoose.Types.ObjectId(req.params.classroom_id);
    const classroom = await Classroom.findOne({_id:classroom_id});

    let populate_query ={};
    let select_query = "";

    var start = new Date();
    start.setUTCHours(0,0,0,0); // this give the start of a day 

    var end = new Date();
    end.setUTCHours(23,59,59,999);  // this give the end of a day


    if(refresh_mode === 'today_class'){
        populate_query = {
            path : 'Classes',
            match :{
                'dateTime':{
                    $gt : start,
                    $lte : end
                }
            }
        };

        select_query = "Classes"



    }else if(refresh_mode === 'scheduled_class'){

        populate_query = {
            path : 'Classes',
            match :{
                'dateTime':{
                    $gt : end
                }
            }
        }

        select_query = "Classes"


    }else if(refresh_mode === 'student'){

        populate_query = {
            path : 'Students',
            select: 'Student_id',  // it can be modified as per requirements
            populate :{
                    path : 'Student_id',
                    select :'first_name last_name email phoneNumber'
                }
        }
        select_query = "Students"


    }else if(refresh_mode === 'teacher'){

        populate_query = {
            path : 'Teachers',
            select: 'Teacher_id',  
            populate :{
                    path : 'Teacher_id',
                    select :'first_name last_name email phoneNumber'
                }
        }
        select_query = "Teachers"


    }else if(refresh_mode === 'materials'){

        populate_query = {
            path : 'Materials',
            select:'Materials',
            populate :{
                path : 'provided_by',
                select : 'first_name last_name role'
            }
        }

        select_query = "Materials"


    }else if(refresh_mode === 'discussion'){

        populate_query = {
            path : 'Discussion',
            // select : 'Discussion'
        }

        select_query = "Discussion"


    }

    if(classroom){
    
        const query_response = await Classroom.findOne({_id : classroom_id}).populate(populate_query).select(select_query)
        res.json({"status":200,"refresh_response":query_response}); // now it will return only Classes

    }else{
        res.json({"ErrorMessage":"Error while getting refreshed response","status":400});
    }
})



module.exports = router;