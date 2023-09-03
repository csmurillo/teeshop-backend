const jwt = require("jsonwebtoken");
module.exports = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token,process.env.JWT_PRIVATE_KEY);
        req.userTokenData = { userId: decodedToken.id };
        next();
    }
    catch(error){
        res.status(401).json({message: "Error: Connection is unavailable"});
    }
};
