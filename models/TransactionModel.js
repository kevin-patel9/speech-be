const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        uid: {
            type: String,
            index: true,
            required: true
        },
        spentOn: {
            type: String,
            required: true
        },
        amount: {
            type: String,
            required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
        subcategories: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);