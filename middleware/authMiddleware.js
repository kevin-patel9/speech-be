const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

exports.isAuth = async(req,res,next) => {
    try {
        const token = req.headers?.authorization?.split(' ')[1];

        if(!token) {
            return res.status(401).send({
                success: false,
                message: "please login first"
            });
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);        
        req.user = await UserModel.findOne({ uid: decoded.uid });
        next();
    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
    
}