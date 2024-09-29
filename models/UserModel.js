const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    uid: {
        type: String,
        required: true,
        index: true,
    },
    name: String,
    email: {
        type: String,
        required: true,
    },
},
{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
