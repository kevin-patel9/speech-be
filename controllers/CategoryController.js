const CategoryModel = require("../models/CategoryModel");
const TransactionModel = require("../models/TransactionModel");

exports.createCategory = async (req, res) => {
    try {
        const { category, subcategories } = req.body;

        const data = {
            category,
            subcategories
        }

        await CategoryModel.create(data);

        return res.status(200).send({ message: "New category created" });
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};

exports.getAllCategory = async (req, res) => {
    try {
        const allCategory = await CategoryModel.find();

        return res.status(200).send({ allCategory });
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};

exports.getActiveSubCategory = async (req, res) => {
    try {
        const { uid } = req.user;

        const userSubcategoryList = await TransactionModel.aggregate([
            {
                $match: { uid }
            },
            {
                $group: {
                    _id: "$subcategories",
                }
            },
            {
                $project: {
                    _id: 0,
                    name: "$_id"
                }
            }
        ]);
        
        userSubcategoryList.unshift({name: "All"})

        return res.status(200).send({ userSubcategoryList });
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};