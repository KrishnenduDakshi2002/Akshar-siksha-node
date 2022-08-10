const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    const token = req.header('auth_token');
    if(!token) return res.status(401).send('Access denied');  // 401 Unauthorised

    try{
        const verified = jwt.verify(token,process.env.TOKEN_SECRET); // this is output the user _id
        req.user = verified;
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}

