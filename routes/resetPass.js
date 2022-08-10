const router = require('express').Router();
const User = require('../model/User');

router.get('/:id',async (req,res)=>{
    // console.log(req.params.id);
    try {
        const id = req.params.id.toString();
        const user = await User.findOne({_id:id});
        if(user) return res.render('resetPass',{"user_id":req.params.id});
        
    } catch (error) {
        res.status(400).send({"status":400,"ErrorMessage":"Phone is not  in registered"})
    }
});

module.exports = router;
