const router = require('express').Router();
//MODELS
const User = require('../model/User');
const Student = require('../model/Student');

// VALIDATIONS WITH JOI
const {registerValidation,loginValidation,changePassValidation} = require('../validation');

// ENCRYPT AND DECRYPT PASSWORD
const bcrypt = require('bcryptjs');

// JSON WEB TOKEN
const jwt = require('jsonwebtoken');

// VERIFY TOKEN 
const verify = require('../verifyToken');

// TWILIO 
const twilio_msg = require('../otp'); // this returns a function

// EMAIL SENDER

const send_email = require('../emailSender');
const otp_email = require('../otp_email');

// 4 DIGIT OTP GENERATION
const otp_generated = Math.floor(1000 + Math.random() * 9000);

console.log(otp_generated);

var CryptoJS = require("crypto-js");

const { default: mongoose } = require('mongoose');




//generating OTP when register is clicked after filling the registration form
// it's front end developer's job to get the phone number and send a get request to this end point
router.post('/otp/generate/',async (req,res)=>{
    try {
        twilio_msg(req.body.phone_number,
            otp_generated);
        res.status(201).json({"status":201,"message":"OTP sent successful"});
        
    } catch (error) {
        res.json({"status":400,"ErrorMessage":"Invalid phone number"})
    }
})

router.post('/email/veification/',async (req,res)=>{
    try {

        otp_email("Verification code",otp_generated,req.body.email);
        res.json({"status":200,"message":"OTP has been sent to your email"});
        
    } catch (error) {
        res.json({"status":400,"ErrorMessage":"Invalid email address"})
    }
})


// when user click the confirm OTP button on OTP validation page 
// front end developer will post all the required details with the otp 


//  NOTE : add  :otp
router.post('/register/:otp',async (req,res)=>{
    //validating otp

    if(req.params.otp != otp_generated) return res.status(400).send({ErrorMessage:"OTP invalid"});

    // lets validate with schema
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send({ErrorMessage:error.details[0].message});

    //Checking if the user is already present in the database or not
    const emailExist = await User.findOne({email: req.body.email});
    //Checking if the user is already present in the database or not
    const phoneExist = await User.findOne({phoneNumber: req.body.phoneNumber});
    if(phoneExist || emailExist) return res.status(400).send({ErrorMessage: 'Record is already present'});

    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);

    // create a new user after validation is done
    const user = new User({
        _id : new mongoose.Types.ObjectId(),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        role: req.body.role,
        email : req.body.email,
        phoneNumber : req.body.phoneNumber,
        institute: req.body.institute,
        institute_code : req.body.institute_code,
        address:req.body.address,
        password: hashPassword

    });
    try{

        const newUser = await user.save(
            async function(err){
                console.log("running save for user ");
                if(err) return res.status(400);

                // CREATING REFERENCE TO STUDENT COLLECTION
                if(req.body.role === 'STUDENT'){

                    const student = new Student({
                        student_id: user._id
                    });
                    const newStudent = await student.save();
                }
            }
        );
         // creating token 
        const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);

        res.json({"status":201,"auth_token":token});
    }catch(err){
        res.status(400).json({"ErrorMessage":{"Message From":"Register router","error":err}})
    }
});

// Login 
// credential (email and password)
router.post('/login',async (req,res)=>{
     // lets validate
     const {error} = loginValidation(req.body);
     if(error) return res.status(400).send({ErrorMessage:error.details[0].message});

     //Checking if the user is already present in the database or not

    let user = await User.findOne({email: req.body.email});

    if(!user) user = await User.findOne({phoneNumber: req.body.phoneNumber}); // if email is not given check for phone number

    if(!user) return res.status(400).send({ErrorMessage: `User does not exist`});
    
    // check password is correct
    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send({ErrorMessage: `Password is incorrect`});

    
    // creating token 
    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);

    // Sending auth_token in response headers
    res.json({"status":200,"auth_token":token});
})


// // change password
router.patch('/change/password',verify,async (req,res)=>{

    // validating whether the password format is correct or not
    const {error}  = changePassValidation(req.body);
    if(error) return res.status(400).send({ErrorMessage: error.details[0].message})

    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);

    // we need the _id from header for updation
    const userId = req.user._id

    // updating the password

    try{

        const updatedPass = await User.updateOne({_id:userId},{$set:{password: hashPassword}});
        res.status(200).json(updatedPass);   /// DEL AFTER DEV
    }catch(err){
        res.status(400);
    }

})


// Forgot password reset message
router.post('/reset_password_url/',async (req,res)=>{

    try {

        const {_id} = await User.findOne({email:req.body.email});
        const id = _id.valueOf(); // this returns the string version of id

        const uid = mongoose.Types.ObjectId(id);
        const user  = await User.findOne({_id:uid});

        // creating token 
        const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);

        const resetPass_url = 'https://akshar-siksha.herokuapp.com/user/reset_password_page/'.concat(token);
    
        const subject = "Reset your Akshar password";
        const recipent = req.body.email;
        send_email(subject,resetPass_url,recipent);

        res.status(200).json({status:200,message: "Password reset link has been sent to your registered email address"})
        
        
    } catch (error) {
        res.status(400).json({status:400,ErrorMessage:"Not registered email address"});
    }
})


// forgot pasword 
router.patch('/reset/password',async (req,res)=>{
  
    // hashing the password

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);

    // we need the _id from header for updation

    const Userid = req.body.id;

    // converting the id to mongoose objectId

    const req_id = mongoose.Types.ObjectId(Userid.toString());

    // updating the password
    try{
        const updatedPass = await User.updateOne({_id:req_id},{$set:{password: hashPassword}});
        res.status(200).json(updatedPass); 
    }catch(err){
        res.status(400);
    }
})


module.exports = router;