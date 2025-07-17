require("dotenv").config();

const express = require("express");
const { ProductModel } = require("./models/productSchema");
require("./config/db"); // resolution --> wrap --> executes --> exports --> cache

const app = express();

app.use(express.json());

app.post("/", async (req, res) => {
    try {
        const data = req.body;
        const newProduct = await ProductModel.create(data);
        console.log(newProduct);

        res.json({
            isSuccess: "true",
            message: "Product created!",
        });
    } catch (err) {
        console.log(err);
        console.log(err.name);
        console.log(err.code);
        if (err.name == "ValidationError" || err.code == "11000") {
            res.status(400).json({
                isSuccess: false,
                message: `Validation failed: ${err.message}`,
            });
        } else {
            res.status(500).json({
                isSuccess: false,
                message: "Internal server error",
            });
        }
    }
});

app.listen(3900, () => {
    console.log("------------ Server Started -------------");
});
