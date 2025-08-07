const { isValidObjectId } = require("mongoose");

const updateItemInCartValidator = (req, res, next) => {
    try {
        console.log("------- inside updateItemInCartValidator --------");
        const { productId } = req.params;

        if (!productId) {
            res.status(400).json({
                isSuccess: false,
                message: "productId is required!",
            });
            return;
        }

        if (!isValidObjectId(productId)) {
            res.status(400).json({
                isSuccess: false,
                message: "Invalid productId!",
            });
            return;
        }

        next();
    } catch (err) {
        console.log("------- 🔴 Error in updateItemInCartValidator --------", err.message);
        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = { updateItemInCartValidator };
