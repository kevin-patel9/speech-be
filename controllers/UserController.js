const UserModel = require("../models/UserModel");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
    try {
        const { uid, name, email } = req.body;

        // Check if user already exists
        const userExist = await UserModel.findOne({ uid });

        if (userExist) {
            console.log("User already exists:", userExist);
            return res.status(400).send({
                message: "User already exists. Try another unique User ID",
            });
        }

        const newUser = new UserModel({ uid, name, email });
        
        await newUser.save();

        const token = await generateToken(uid);

        return res.status(200).cookie("token", token).send({ token });
    } catch (err) {
        console.log(err);
        
        res.status(500).send({
            message: err.message,
        });
    }
};

exports.loginToken = async (req, res) => {
    try {
        let { uid } = req.body;

        const user = await UserModel.findOne({ uid });
        if (!user) {
            return res.status(400).send({
                message: "User does not exist",
            });
        }

        const token = await generateToken(uid);

        return res.status(200).cookie("token", token).send({ token });
    } catch (err) {
        return res.status(500).send({
            message: err.message,
        });
    }
};

exports.checkIfUserExist = async (req, res) => {
    try {
        let { uid } = req.body;

        const user = await UserModel.findOne({ uid });

        return res.status(200).send({ user });
    } catch (err) {
        return res.status(500).send({
            message: err.message,
        });
    }
};  