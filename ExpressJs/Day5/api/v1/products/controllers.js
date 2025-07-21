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
const updateProductController = async (req, res) => {
    try {
        console.log("--------- inside updateProductController ----------");
        const data = req.body;
        const { productId } = req.params;

        const updatedProduct = await ProductModel.findByIdAndUpdate(productId, data).lean(); //{new: true,runValidators: true,}

        if (updatedProduct === null) {
            res.status(400);
            res.json({
                isSuccess: false,
                message: "Id does not match",
                data: {},
            });
            return;
        }

        res.status(200);
        res.json({
            isSuccess: true,
            message: "Product updated!",
            data: {
                product: updatedProduct,
            },
        });
    } catch (err) {
        console.log("--------- error in updateProductController ----------", err.message);

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

// D
const deleteProductController = async (req, res) => {
    try {
        console.log("--------- inside deleteProductController ----------");
        const { productId } = req.params;

        const deletedProduct = await ProductModel.findByIdAndDelete(productId);

        if (deletedProduct === null) {
            res.status(400);
            res.json({
                isSuccess: false,
                message: "Invalid product id!",
                data: {},
            });
            return;
        }

        res.status(204); // no content
        res.json({
            isSuccess: true,
            message: "Product delete!",
            data: {
                product: deletedProduct,
            },
        });
    } catch (err) {
        console.log("--------- error in deleteProductController ----------", err.message);

        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
            data: {},
        });
    }
};

module.exports = {
    createProductController,
    getAllProductsController,
    updateProductController,
    deleteProductController,
};
