const { ProductModel } = require("../../../models/productSchema");

// C
const createProductController = async (req, res) => {
    try {
        console.log("--------- inside createProductController ----------");
        const data = req.body;
        const newProduct = await ProductModel.create(data);

        res.status(201);
        res.json({
            isSuccess: true,
            message: "Product created!",
            data: {
                product: newProduct,
            },
        });
    } catch (err) {
        console.log("--------- error in createProductController ----------", err.message);

        if (err.name === "ValidationError" || err.code == 11000) {
            res.status(400).json({
                isSuccess: false,
                message: err.message,
                data: {},
            });
            return;
        }

        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
            data: {},
        });
    }
};

// R
const getAllProductsController = async (req, res) => {
    try {
        console.log("--------- inside getAllProductsController ----------");
        const result = await ProductModel.find();

        res.status(200).json({
            isSuccess: true,
            message: "Product list",
            data: {
                products: result,
            },
        });
    } catch (err) {
        console.log("--------- error in getAllProductsController ----------", err.message);

        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
            data: {},
        });
    }
};

// U

// D

module.exports = { createProductController, getAllProductsController };
