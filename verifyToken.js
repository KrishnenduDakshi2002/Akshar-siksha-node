const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).send('Access denied');  // 401 Unauthorised

    try{
        const verified = jwt.verify(token,process.env.TOKEN_SECRET); // outputs the user _id
        req.user = verified;
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}

