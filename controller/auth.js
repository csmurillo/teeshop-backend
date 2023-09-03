const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signIn =(req,res)=>{
    const {email,password} = req.body;
    User.findOne({ email }, async(err,user)=>{
        if(err||!user){
            console.log("Error account no exist");
            return res.status(401).json({
                error:"Error: This account does not exist."
            });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            console.log("Error check emailt");
            return res.status(401).json({
                error:"Error: Please check email or password."
            });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_PRIVATE_KEY);
        user.password=undefined;
        res.status(200).json({
            token,
            user
        });
    });
};
exports.signUp =(req,res)=>{
    bcrypt.hash(req.body.password, 10, function(err,hashPassword){
        const user = new User({...req.body, password:hashPassword});
        user.save((err,user)=>{
            if(err){
                return res.status(400).json({
                    error:"Error: User already exist"
                });
            }
            res.json({user});
        });
    });
};
exports.isAuth = (req,res,next)=>{
    const isAuth = req.userTokenData && req.user && req.userTokenData.userId!=req.user._id;
    if(isAuth){
        return res.status(400).json({
            message:"Error: User does not have access to resource"
        });
    }
    next();
};




