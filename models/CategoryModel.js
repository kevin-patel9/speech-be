const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        category: String,
        subcategories: [
            { 
                name: String,
                icon: String
            }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);