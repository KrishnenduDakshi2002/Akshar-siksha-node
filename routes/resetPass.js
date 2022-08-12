const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');


router.get('/:token',async (req,res)=>{
    // console.log(req.params.id);
    try {
        const token = req.params.token;
        const userID = jwt.verify(token,process.env.TOKEN_SECRET); // outputs the user _id
        const user = await User.findOne({_id:userID});
        if(user) return res.render('resetPass',{"user_id":user._id});
        
    } catch (error) {
        res.status(400).send({"status":400,"ErrorMessage":"Invalid token from resetPass.js"})
    }
});

module.exports = router;
