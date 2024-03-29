const User = require("../models/user");

exports.userId = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.profile = user;
        next();
    });
};

exports.read =  (req,res)=>{
    return res.json(req.profile);
};

exports.update = (req,res)=>{

};



