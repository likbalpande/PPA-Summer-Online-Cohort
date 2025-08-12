const { ProductModel } = require("../../../../models/productSchema");

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

module.exports = { updateProductController };
