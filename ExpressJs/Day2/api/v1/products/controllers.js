const { saveProduct, readProducts } = require("../../../models/productModel");

const createProductController = async (req, res) => {
    console.log("--> inside createProductController");
    try {
        const data = req.body;
        await saveProduct(data); // data
        res.status(201).json({
            isSuccess: true,
            message: "product created",
        });
    } catch (err) {
        console.log("---> Error in createProductController", err.message);
        res.status(500).json({ isSuccess: false, message: err.message });
    }
};

const getProductsController = async (req, res) => {
    console.log("--> inside getProductsController");
    try {
        const products = await readProducts();
        res.status(201).json({
            isSuccess: true,
            message: "product fetched!",
            data: {
                products,
            },
        });
    } catch (err) {
        console.log("---> Error in getProductsController", err.message);
        res.status(500).json({ isSuccess: false, message: "Internal Server Error" });
    }
};

// editProductController

// deleteProductController

module.exports = { createProductController, getProductsController };
