const TransactionModel = require("../models/TransactionModel");
const moment = require("moment");

exports.createTransaction = async (req, res) => {
try {
    const { spentOn, amount, category, subcategories } = req.body;
    const { uid } = req.user;

    const data = { uid, spentOn, amount, category, subcategories };

    await TransactionModel.create(data);

    return res.status(200).send({ message: "New transaction created" });
} catch (err) {
    res.status(500).send({
        message: err.message,
    });
}
};

// for pie chart
exports.getTotalExpense = async (req, res) => {
    try {
        const { uid } = req.user;

        const totalExpenses = await TransactionModel.aggregate([
            {
                $match: { uid }
            },
            {
                $group: {
                    _id: "$category",
                    totalAmount: { $sum: { $toDouble: "$amount" } },
                    count: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "_id",
                    foreignField: "_id",
                    as: "categoryInfo"
                }
            },
            {
                $unwind: "$categoryInfo"
            },
            {
                $project: {
                    _id: 0,
                    categoryId: "$_id",
                    categoryName: "$categoryInfo.category",
                    totalAmount: 1,
                    count: 1
                }
            }
        ]);

        return res.status(200).send({ totalExpenses });
    } catch (err) {
        return res.status(500).send({
            message: err.message,
        });
    }
};

// for graph
exports.getWeekExpense = async (req, res) => {
    try {
        const { uid } = req.user;

        const today = moment().startOf('day');
        const startOfWeek = today.clone().subtract(6, 'days');

        const weekExpenses = await TransactionModel.aggregate([
            {
                $match: {
                    uid,
                    createdAt: {
                        $gte: startOfWeek.toDate(),
                        $lte: today.endOf('day').toDate()
                    }
                }
            },
            {
                $group: {
                    _id: {
                        date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                        category: "$category"
                    },
                    totalAmount: { $sum: { $toDouble: "$amount" } },
                    count: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: "$_id.date",
                    categories: {
                        $push: {
                            category: "$_id.category",
                            totalAmount: "$totalAmount",
                            count: "$count"
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    date: "$_id",
                    categories: 1
                }
            },
            {
                $sort: { date: 1 }
            }
        ]);

        return res.status(200).send({ weekExpenses });
    } catch (err) {
        return res.status(500).send({
            message: err.message,
        });
    }
};

// get user expense list according to subcategory filter

exports.getDataListForSubCategory = async (req, res) => {
    try {
        const { subcategoryName } = req.body;
        const { uid } = req.user;

        if (!subcategoryName) {
            return res.status(400).send({ message: "Subcategory name is required." });
        }

        let expenses;

        // Check if subcategoryName is "All"
        if (subcategoryName === "All") {
            expenses = await TransactionModel.find({ uid }).select("-updatedAt -uid");
        } else {
            expenses = await TransactionModel.find({
                uid,
                subcategories: subcategoryName
            }).select("-updatedAt -uid");
        }

        return res.status(200).send({ expenses: expenses.reverse() });
    } catch (err) {
        return res.status(500).send({
            message: err.message,
        });
    }
};
