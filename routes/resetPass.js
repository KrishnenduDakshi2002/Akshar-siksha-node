const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
// VERIFY TOKEN 
const verify = require('../verifyToken');

router.get('/:token',verify,async (req,res)=>{
    // console.log(req.params.id);
    try {
        const userId = req.user._id;
        const user = await User.findOne({_id:userId});
        if(user) return res.render('resetPass',{"user_id":req.params.id});
        
    } catch (error) {
        res.status(400).send({"status":400,"ErrorMessage":"Invalid token from resetPass.js"})
    }
});

module.exports = router;
