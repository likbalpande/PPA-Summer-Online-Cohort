const addItemToCartValidator = (req, res, next) => {
    try {
        console.log("------- inside addItemToCartValidator --------");
        const { productId } = req.params;

        if (!productId) {
            res.status(400).json({
                isSuccess: false,
                message: "productId and userId are required!",
            });
            return;
        }

        //TODO: if given ids are in objectid format specified by mongodb

        next();
    } catch (err) {
        console.log("------- 🔴 Error in addItemToCartValidator --------", err.message);
        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = { addItemToCartValidator };
