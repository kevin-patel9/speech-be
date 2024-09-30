const express = require("express");
const { json, urlencoded } = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
require("dotenv").config({ path: "./config/config.env" });
const { connectDB } = require("./config/database");

connectDB();

app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
const whitelist = ["http://localhost:3000", "https://speech-front.vercel.app"];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback("Not allowed by CORS");
        }
    },
    credentials: true,
};

app.use(cors(corsOptions));
app.use(json());
app.use(urlencoded({ extended: true }));

// Simple request for the testing
app.get("/", (req, res) => {
    res.status(200).send("API is running");
});

// routes
const user = require("./routes/UserRoute");
const category = require("./routes/CategoryRoute");
const transaction = require("./routes/TransactionRoute");

// using routes
app.use("/api/v1/user", user);
app.use("/api/v1/category", category);
app.use("/api/v1/transaction", transaction);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
